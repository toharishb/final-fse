import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { Reminder } from '../Reminder';
import { ReminderService } from '../services/reminder.service';
import { Category } from '../Category';
import { CategoryService } from '../services/category.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  errMessage: string;
  note: Note;
  notes: Note[];
  states: Array<string> = ['not-started', 'started', 'completed'];
  tempReminders = Array<Reminder>();
  catId: string;
  count: number = 0;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  catgeoryFlag: boolean = true;


  constructor(private nService: NotesService, public dialog: MatDialog,
    private reminderservice: ReminderService,
    private categoryService: CategoryService) {
    this.note = new Note();
    this.note.category = new Category();
    this.note.reminders = new Array<Reminder>();
    this.notes = [];
    this.errMessage = '';
    this.tempReminders = [];



  }
  ngOnInit() {

    this.nService.getNotes().subscribe(
      data => { this.notes = data },
      err => {
        if (err.status === 403) {
          this.errMessage = err.error.message;
        } else {

          this.errMessage = err.message;
        }
      }

    );
    if (this.notes == null) {
      this.notes = new Array<Note>();
    }
  }

  addNote() {
   if (this.note.noteTitle !== '' || this.note.noteContent !== '') {


     /* if (this.note.reminders != undefined && this.note.reminders.length > 0) {
        console.log(1);
        this.count = 1;
        this.addReminder();

      }
      if (this.count == 0 && this.note.category.categoryName !== undefined) {
        console.log(2);
        this.count = 2;
        this.addcategory(this.note);

      }//else if(this.count == 0){*/
this.nService.addNote(this.note).subscribe(
        data => {

        }, err => {
          this.errMessage = err.message

        }
      );
      this.note = new Note();
      this.note.reminders = new Array<Reminder>();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      width: '250px',
      data: new Reminder()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.note.reminders.push(this.reminderservice.getReminder());
      console.log(this.note.reminders);

    });
  }

  openDialogCategory(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: new Category()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.note.category = this.categoryService.getcategory();
      this.catgeoryFlag = false;


    });
  }

  remove(reminder: any): void {
    let index = this.note.reminders.indexOf(reminder);

    if (index >= 0) {
      this.note.reminders.splice(index, 1);
    }
  }
  removeCategory() {
    this.note.category = new Category();
    this.catgeoryFlag = true;
  }
  addReminder() {
    this.note.reminders.forEach(r => {
      this.reminderservice.addReminder(r).subscribe(
        data => {
          this.count = 1;
          this.tempReminders.push(data);
          console.log(this.tempReminders);
        }, err => {
          this.errMessage = err.message

        }
      );
    });

    this.note.reminders = this.tempReminders;
    console.log(this.note.reminders);
    //this.addcategoryApi(note);
  }

  addcategory(note: Note) {

    if (note.category.categoryName !== undefined) {
      this.catgeoryFlag = true;
      this.categoryService.addCategory(this.note.category).subscribe(
        data => {

          console.log('success');
          note.category.categoryId = data['id'];
          this.addNoteApi(note);

        }, err => {
          this.errMessage = err.message

        }
      );
    }
    else {
      this.addNoteApi(note);
    }
  }
  addNoteApi(note: Note) {


    console.log('inside');
    console.log(note);
    setTimeout(() => {
      this.nService.addNote(note).subscribe(
        data => {

        }, err => {
          this.errMessage = err.message

        }
      );
      this.count = 0;

    }, 2000);

  }

}


