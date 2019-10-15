import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/';
import { Note } from '../note';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  note : Note;
  catIcon: string = '';
  constructor() { }

  ngOnInit() {
    console.log(this.note);
    //healing,work,library-books,person,list
    if(this.note.category.categoryName == 'Health'){
      this.catIcon = 'healing';
    }
    else if(this.note.category.categoryName == 'Study'){
      this.catIcon = 'assignment';
    }
    else if(this.note.category.categoryName == 'Work'){
      this.catIcon = 'work';
    }
    else if(this.note.category.categoryName == 'Personal'){
      this.catIcon = 'person';
    }
    else if(this.note.category.categoryName == 'Others'){
      this.catIcon = 'list';
    }
  }

}
