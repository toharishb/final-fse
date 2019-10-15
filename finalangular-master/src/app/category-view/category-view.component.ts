import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  catHealth: Array<Note> = new Array<Note>();
  catStudy: Array<Note> = new Array<Note>();
  catPersonal: Array<Note> = new Array<Note>();
  catWork: Array<Note> = new Array<Note>();
  catOthers: Array<Note> = new Array<Note>();
  notesArry: Array<Note> = new Array<Note>();
  note: Note;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => {
        this.notesArry = data;
        console.log(this.notesArry);
        this.loopdata(this.notesArry);
      },err => {

      }
    );

  }
  loopdata(arraynotes){
    arraynotes.forEach(element => {
      if(element.category.categoryName == 'Health'){
        this.catHealth.push(element);
      }
      else if(element.category.categoryName == 'Study'){
        this.catStudy.push(element);
      }
      else if(element.category.categoryName == 'Personal'){
        this.catPersonal.push(element);
      }
      else if(element.category.categoryName == 'Work'){
        this.catWork.push(element);
      }
      else if(element.category.categoryName == 'Others'){
        this.catOthers.push(element);
      }
    });
  }

}
