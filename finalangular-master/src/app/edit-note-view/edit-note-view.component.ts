import { Component, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Output } from '@angular/core';
import { Location } from '@angular/common';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { Category } from '../Category';
import { Reminder } from '../Reminder';
import { Promise } from 'q';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  noteEdited: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  noteForm: FormGroup;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  categoryFlag: boolean = true;
  categoryAddFlag: boolean;
  counreminder: number;
  tempReminders: Array<Reminder>;
  reminderAdd: Array<Reminder>;
  categoryAdd: Category;
  reminderRemove: Array<Reminder> = new Array<Reminder>();
  categoryRemove: Category = new Category();
  r : Reminder = new Reminder();
  


  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private routerService: RouterService,
    private noteservice: NotesService,
    private reminderservice : ReminderService,
    private categoryService: CategoryService) {
    this.errMessage = '';
    this.noteForm = new FormGroup({
      title: new FormControl(),
      text: new FormControl(),
      state: new FormControl()
    });
    this.reminderAdd = new Array<Reminder>();
    this.categoryAdd = new Category();
    this.tempReminders = new Array<Reminder>();
    
  }

  ngOnInit() {
    console.log(this.data.noteId);
    this.note = this.noteservice.getNoteById(this.data.noteId);
    if(this.note.category.categoryName != null){
      this.categoryFlag = false;
      this.categoryAddFlag = true;
    }
    
    if(this.note.reminders == undefined){
      this.note.reminders = new Array<Reminder>();
    }else{
      this.counreminder = this.note.reminders.length;
      this.reminderAdd = this.note.reminders;
    }
    this.noteEdited = this.note;
    console.log(this.note);
    console.log(this.noteEdited);
    console.log('Data Retrieved  ' + JSON.stringify(this.note));
    
  }

  onSave() {
    
    

    console.log('before notes edited');
    //deleteing
    this.deleteCategory(this.categoryRemove);
    this.reminderRemove.forEach( rem => {
      this.deleteReminder(rem);
    }

    );
   // this.addcategoryIfAny();
   // this.addreminderIfAny();
   // setTimeout(() =>{
      console.log(this.noteEdited);
      console.log(this.note);
      this.noteservice.editNote(this.noteEdited).subscribe(
        data => { 
          console.log('notes edited');
      },
        err => {
                   
          if (err.status === 403) {
            this.errMessage = err.error.message;
          } else {
  
            this.errMessage = err.message;
          }
        }
      );
      this.categoryService.editCategory(this.noteEdited.category).subscribe(
        data => { console.log('notes edited category'); },
        err => {
          
          
          if (err.status === 403) {
            this.errMessage = err.error.message;
          } else {
  
            this.errMessage = err.message;
          }
        }
      );
      this.noteEdited.reminders.forEach(r =>{
      this.reminderservice.editReminder(r).subscribe(
        data => { console.log('notes edited reminder'); },
        err => {
                   
          if (err.status === 403) {
            this.errMessage = err.error.message;
          } else {
  
            this.errMessage = err.message;
          }
        }
      );
    });
    //},6000);
    
    
    
    
    this.dialogRef.close();
  }

  openDialog(reminder): void {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      width: '250px',
      data: reminder
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.note.reminders.push(this.reminderservice.getReminder());
      console.log(this.noteEdited.reminders);
      
    });
  }

  openDialogCategory(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: this.noteEdited.category
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteEdited.category = this.categoryService.getcategory();      
      this.categoryFlag = false;
      this.categoryAddFlag = true;

      
    });
  }

  remove(reminder: any): void {
    let index = this.noteEdited.reminders.indexOf(reminder);

    if (index >= 0) {
      this.noteEdited.reminders.splice(index, 1);
      if(reminder.reminderId !== undefined){
        this.reminderRemove.push(reminder);
      }
      //this.deleteReminder(reminder);
    }
  }
  removeCategory(){

    if(this.noteEdited.category.categoryId !== undefined){
      this.categoryRemove = this.noteEdited.category;
    }
    //this.deleteCategory(this.noteEdited.category);
    this.noteEdited.category = new Category();
    this.categoryFlag = true;
    this.categoryAddFlag = false;

  }


  openDialogAdd(): void {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      width: '250px',
      data: new Reminder()
    });
 
    dialogRef.afterClosed().subscribe(result => {
      let r: Reminder = new Reminder();
      r = this.reminderservice.getReminder();
      this.reminderAdd.push(r);
           
      
    });
  }

  openDialogCategoryAdd(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: new Category()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteEdited.category = this.categoryService.getcategory();
      this.categoryFlag = false;
      this.categoryAddFlag = false;

      
    });
  }

  addcategoryIfAny(){
    
    
    if(!this.categoryAddFlag){
      if(this.noteEdited.category.categoryName !== undefined){
        console.log('inside category');
        this.categoryService.addCategory(this.noteEdited.category).subscribe(
          data => {
            
            console.log(data);
            this.noteEdited.category.categoryId = data['id'];
                        
          }, err => {
            this.errMessage = err.message
            
          }
        );
      }
    }
    
  }
    addreminderIfAny(){
    if(this.counreminder != this.reminderAdd.length){
    console.log('add reminder');
    this.reminderAdd.forEach( remin => {
      if(remin.reminderId == undefined){
        this.reminderservice.addReminder(remin).subscribe(
        data => { 
        
        this.tempReminders.push(data);
        console.log(this.tempReminders);
        }, err => {
          this.errMessage = err.message
          
        }
      );
    }else{
      this.tempReminders.push(remin);
    }
    });

    
    console.log(this.tempReminders);
    this.noteEdited.reminders = this.tempReminders;
    
    
      }
  }

  deleteCategory(category){
    if(category.categoryId !== undefined){
      this.categoryService.deleteCategory(category).subscribe(
        data => {
          console.log('deleted');
        },
        err => {

        }
      )
    }
  }

  deleteReminder(reminder){
    if(reminder.reminderId !== undefined){
      this.reminderservice.deleteReminder(reminder).subscribe(
        data => {
          console.log('deleted');
        },
        err => {

        }
      )
    }
  }

}
