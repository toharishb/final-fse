import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private noteService: NotesService,
  private routerServcie : RouterService) {
    this.noteService.fetchNotesFromServer();
  }

  routeTonoteview(){
    this.routerServcie.routeToNoteView();
  }
  routeTocategory(){
    this.routerServcie.routeToCategory();
  }
  routeToreminder(){
    this.routerServcie.routeToReminders();
  }
}
