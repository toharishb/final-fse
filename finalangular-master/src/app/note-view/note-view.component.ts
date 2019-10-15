import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  @Output()
  notes: Array<Note>;

  

  
  constructor(private noteService: NotesService) {

    this.notes = [];
    
  }
  
  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      console.log("this.notes"+this.notes);
    });
  }
}
