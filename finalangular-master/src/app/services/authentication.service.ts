import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthenticationService {

  isLogin: Boolean= false;
  loginflag : BehaviorSubject<Boolean>;
  private authUrl: string;//Not

  constructor(private httpclient: HttpClient) {
    this.authUrl = 'http://localhost:3000/auth/v1/';
    this.loginflag = new BehaviorSubject(false);
  }

  authenticateUser(data) {
    sessionStorage.setItem('userName',data.userId);

    return this.httpclient.post<any>('http://localhost:8089/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
    
    this.isLogin = true;
    localStorage.setItem('flag', 'true');
    this.loginflag.next(this.isLogin);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.httpclient.post('http://localhost:8816/auth/v1/isAuthenticated', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe(res => {
        resolve(res['isAuthenticated']);
      },
        err => {
          reject(err);
        });
    });
  }

  isLoggedin(){
    
    return localStorage.getItem('flag');
  }

  getLoginflag(): BehaviorSubject<Boolean> {
    return this.loginflag;

  }
  logout(){
    this.isLogin = false;
    localStorage.clear();
    sessionStorage.clear();
  }
}
