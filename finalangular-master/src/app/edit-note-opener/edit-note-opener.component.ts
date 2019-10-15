import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { OnInit } from '@angular/core';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  noteId: number;
  

  constructor(private dialog: MatDialog,
    private activatedroute: ActivatedRoute,
    private routerService: RouterService
  ) {
   console.log('before calling');
             
    

   const noteid = +this.activatedroute.snapshot.paramMap.get('noteid');
    console.log(noteid);
    
    this.dialog.open(EditNoteViewComponent, {
      data: {
        noteId: noteid
      }
    }).afterClosed().subscribe(result => {
       console.log("closed "+ this.activatedroute.parent);
      this.routerService.routeBack();
    });
  }

  ngOnInit() {
    // return new Promise((resolve,reject) => {
    //   this.activatedroute.params.subscribe(params => {
    //   this.noteId = params.noteid;
    //   this.dialog.open(EditNoteViewComponent, {
    //     data: {
    //       noteId: this.noteId
    //     }
    //   }).afterClosed().subscribe(result => {
    //      console.log("closed "+ this.activatedroute.parent);
    //     this.routerService.routeBack();
    //   });
    //           },
    // err => {
  
    // });

    // });
    
    
  }
}


/*import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit{
  noteId:number;

  constructor(private dialog:MatDialog,
    private activatedRoute:ActivatedRoute,
    private routerService:RouterService) 
    { 
      this.activatedRoute.params.subscribe(params =>
        this.noteId=params.noteid);

        this.dialog.open(EditNoteViewComponent,{
          data:{
            note:this.noteId
          }
        })
    }

  ngOnInit() {
  }
}*/

