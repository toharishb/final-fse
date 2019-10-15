import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../Category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  categories: Array<String> = [
    'Study',
    'Health',
    'Work',
    'Personal',
    'Others'
  ];
  category: Category;
  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  private categoryservice : CategoryService) {

    this.category = data;
    
   }

  ngOnInit() {
  }

   addcategory(){
     this.category.categoryId = this.data.categoryId;
     this.category.categoryCreatedBy = sessionStorage.getItem('userName');
     this.categoryservice.saveCategory(this.category);
     
     this.dialogRef.close();
   }
}
