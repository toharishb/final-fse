import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  notes: Array<Note>;

  constructor(private noteService: NotesService) {

    this.notes = [];
    this.completedNotes = [];
    this.notStartedNotes = [];
    this.startedNotes = [];
  }
  ngOnInit() {
    console.log('inside listview');
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.notes.forEach(n => {
        if (n.noteStatus === 'started') {
          this.startedNotes.push(n);
        }
        if (n.noteStatus === 'not-started') {
          this.notStartedNotes.push(n);
        }
        if (n.noteStatus === 'completed') {
          this.completedNotes.push(n);
        }
      });
    },
    err => console.log(err));
     }

}
