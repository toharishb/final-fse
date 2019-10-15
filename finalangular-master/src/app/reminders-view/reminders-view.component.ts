import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Reminder } from '../Reminder';

@Component({
  selector: 'app-reminders-view',
  templateUrl: './reminders-view.component.html',
  styleUrls: ['./reminders-view.component.css']
})
export class RemindersViewComponent implements OnInit {

  remindernotes: Array<Note>;
  remindernotesDaily: Array<Note> = new Array<Note>();
  remindernotesHourly: Array<Note> = new Array<Note>();
  remindernotesWeekly: Array<Note> = new Array<Note>();
  remindernotesMonthly: Array<Note> = new Array<Note>();
  remindernotesYearly: Array<Note> = new Array<Note>();
  tempNotes: Note = new Note();
  

  
  constructor(private noteService: NotesService) {

    this.remindernotes = [];
    
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => {
      this.remindernotes = notes;
      
      // this.remindernotes.forEach(note => {
      //   const n = note;
      //   n.reminders.forEach(r => {
      //     if(r.reminderType == 'Hourly'){
      //       this.tempNotes = n;
      //       let rH = r;
      //       this.tempNotes.reminders = new Array<Reminder>();
      //       this.tempNotes.reminders.push(rH);
      //       this.remindernotesHourly.push(this.tempNotes);
      //     }
      //     else if(r.reminderType == 'Daily'){
      //       this.tempNotes = n;
      //       let rD = r;
      //       this.tempNotes.reminders = new Array<Reminder>();
      //       this.tempNotes.reminders.push(rD);
      //       this.remindernotesDaily.push(this.tempNotes);
      //     }
      //     else if(r.reminderType == 'Weekly'){
      //       this.tempNotes = n;
      //       let rW = r;
      //       this.tempNotes.reminders = new Array<Reminder>();
      //       this.tempNotes.reminders.push(rW);
      //       this.remindernotesWeekly.push(this.tempNotes);
      //     }
      //     else if(r.reminderType == 'Monthly'){
      //       this.tempNotes = n;
      //       let rM = r;
      //       this.tempNotes.reminders = new Array<Reminder>();
      //       this.tempNotes.reminders.push(rM);
      //       this.remindernotesMonthly.push(this.tempNotes);
      //       console.log(this.tempNotes);
      //     }
      //     else if(r.reminderType == 'Yearly'){
      //       this.tempNotes = n;
      //       let rY = r;
      //       this.tempNotes.reminders = new Array<Reminder>();
      //       this.tempNotes.reminders.push(rY);
      //       this.remindernotesYearly.push(this.tempNotes);
      //       console.log(this.tempNotes);
      //     }
      //   });
      // });
      
    });
  }

}
