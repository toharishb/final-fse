import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { Location } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input()
  note: Note;
  
  constructor(private routerService: RouterService,
  private notesService: NotesService,
  private categoryService: CategoryService,
  private reminderService: ReminderService) { }
  openEditNoteView() {
    console.log('Title Note Component Clicked ' + this.note.noteTitle);
    
    this.routerService.routeToEditNoteView(this.note.noteId);
  }
  deleteNote(){
    console.log(this.note.noteId);
    this.notesService.deletNote(this.note.noteId).subscribe(
      data =>{
        console.log('notes deleted');
      },err => {

      }
    );
    if(this.note.category.categoryId !== null){
      this.categoryService.deleteCategory(this.note.category).subscribe(
        data =>{
          console.log('category deleted');
        },err => {
  
        }
      );
    }
    if(this.note.reminders.length > 0){
      this.note.reminders.forEach( r =>{
        this.reminderService.deleteReminder(r).subscribe(
          data =>{
            console.log('reminders deleted');
          },err => {
    
          }
        );
      }

      );
    }

  }

}
