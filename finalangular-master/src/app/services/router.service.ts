import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class RouterService {
  constructor(private router: Router,private location:Location) { }

  routeToDashboard() {
     this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    
    this.router.navigate(['login']);
  }
  routeToRegister() {
    this.router.navigate(['register']);
  }

  routeToEditNoteView(noteId) {
    console.log("Navigating to editview");
    this.router.navigate(['dashboard', {
      outlets: {
        noteEditOutlet: ['note', noteId, 'edit'],
      }
    }]);
    //this.router.url="/dashboard/view/noteview";
    console.log("url"+this.router.url);
     //url/dashboard/(view/noteview//noteEditOutlet:note/1/edit)
     //url/dashboard/view/noteview
     console.log("url"+this.router.url);

  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    this.router.navigate(['dashboard/view/noteview']);

  }

  routeToListView() {
    console.log("to list");
    
    this.router.navigate(['dashboard/view/listview']);
  }
  routeToUserProfilePage(){
    this.router.navigate(['dashboard/userprofile']);
  }

  routeToCategory(){
    this.router.navigate(['dashboard/category']);
  }
  routeToReminders(){
    this.router.navigate(['dashboard/reminders']);
  }
}
