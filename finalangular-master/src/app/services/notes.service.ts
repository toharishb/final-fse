import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  saveNote: Note;
  constructor(private httpclient: HttpClient, private authservice: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
    this.saveNote = new Note();
  }

  fetchNotesFromServer() {
    console.log('in nbote service');
    return this.httpclient.get<Note[]>('http://localhost:8082/api/v1/note/'+sessionStorage.getItem('userName'), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(notes => {
      console.log('notes from success');
      console.log(notes);
      this.notes = notes;
      this.notesSubject.next(this.notes);
    },
      (err: any) => {
        console.log("in errpr");
        this.notesSubject.error(err);
      });

  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;

  }

  addNote(note: Note): Observable<Note> {
    note.noteCreatedBy=sessionStorage.getItem('userName');
    return this.httpclient.post<Note>('http://localhost:8082/api/v1/note/', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }));
  }

  editNote(note: Note): Observable<Note> {
    return this.httpclient.put<Note>('http://localhost:8082/api/v1/note/'
    +sessionStorage.getItem('userName')+`/${note.noteId}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedNote => {

      const constnote = this.notes.find(n => n.noteId === editedNote.noteId);
      Object.assign(constnote, editedNote);
      this.notesSubject.next(this.notes);
    }));
  }

  getNoteById(noteId): Note {
    
    const foundnote = this.notes.find(note => note.noteId == noteId);
    
    return foundnote;
  }


  deletNote(noteId): Observable<Note> {
    console.log('inside delte')
    return this.httpclient.delete<Note>('http://localhost:8082/api/v1/note/'
    +sessionStorage.getItem('userName')+'/'+noteId, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(addedNote => {
      const foundnote = this.notes.find(note => note.noteId == noteId);
      let index = this.notes.indexOf(foundnote);
      if (index >= 0) {
        this.notes.splice(index, 1);
      }
      
      this.notesSubject.next(this.notes);
    }));
  }

  getNoteSaved(){
    console.log(this.saveNote);
    return this.saveNote;
  }
  setNote(note){
    this.saveNote = note;
    console.log('saved');
    console.log(this.saveNote);
  }

}
