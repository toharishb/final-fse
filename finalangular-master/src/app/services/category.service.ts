import { Injectable } from '@angular/core';
import { Category } from '../Category';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class CategoryService {

  category: Array<Category>;
  cate: Category;
  categorySubject: BehaviorSubject<Array<Category>>;
  constructor(private httpclient: HttpClient, private authservice: AuthenticationService) {
    this.category = [];
    this.cate = new Category();
    this.categorySubject = new BehaviorSubject([]);
  }

  fetchCategorysFromServer() {
    return this.httpclient.get<Category[]>('http://localhost:8814/api/v1/category',
    {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(category => {
      console.log('success');
      this.category = category;
      this.categorySubject.next(this.category);
    },
      (err: any) => {
        this.categorySubject.error(err);
      });

  }

  getCategorys(): BehaviorSubject<Array<Category>> {
    return this.categorySubject;

  }

  addCategory(category: Category): Observable<Category> {
    return this.httpclient.post<Category>('http://localhost:8814/api/v1/category', category,
     {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(addedCategory => {
      this.category.push(addedCategory);
      this.categorySubject.next(this.category);
    }));
  }

  editCategory(category: Category): Observable<Category> {
    return this.httpclient.put<Category>(`http://localhost:8814/api/v1/category/${category.categoryId}`, category, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedCategory => {

      const constnote = this.category.find(n => n.categoryId === editedCategory.categoryId);
      Object.assign(constnote, editedCategory);
      this.categorySubject.next(this.category);
    }));
  }

  getCategoryById(categoryId): Category {
    
    const foundnote = this.category.find(category => category.categoryId == categoryId);
    
    return foundnote;
  }
  saveCategory(category){
    this.cate = category;
  }
  getcategory(){
    return this.cate;
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.httpclient.delete<Category>(`http://localhost:8814/api/v1/category/${category.categoryId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(deletedCategory => {

      let index = this.category.indexOf(category);
      if (index >= 0) {
        this.category.splice(index, 1);
      }
      
      this.categorySubject.next(this.category);
    }));
  }

}
