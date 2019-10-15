import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User } from '../login/User';

@Injectable()
export class UserService {

  constructor(private httpclient: HttpClient,
  private authservice: AuthenticationService) { }

  registerUser(data){
    
    return this.httpclient.post('http://localhost:8816/api/v1/register',data,{
      headers: new HttpHeaders().set('content-type', `application/JSON`)
    }).subscribe(notes => {
      console.log('mongo registerd');
    },
      (err: any) => {
        
      });

  }
  getUser() {
    
    return this.httpclient.get<User>('http://localhost:8816/api/v1/user/'
    +sessionStorage.getItem('userName'), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)});
  }

  editUser(user){
    return this.httpclient.put('http://localhost:8816/api/v1/user/'+sessionStorage.getItem('userName'),
    user,{
      headers: new HttpHeaders().set('content-type', `application/JSON`)
      .set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(notes => {
      console.log('mongo updated');
    },
      (err: any) => {
        
      });

  }
  }
