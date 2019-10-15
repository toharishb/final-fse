import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegistrationService {

  isRegistered: boolean;
  constructor(private httpclient: HttpClient) {
    this.isRegistered = false;
  }

  isregistered(){
    return this.isRegistered;
  }

  registerUser(data){
    return this.httpclient.post("http://localhost:8089/api/v1/auth/register",data,{
        headers: new HttpHeaders().set('content-type', `application/JSON`)
      }).subscribe(notes => {
        this.isRegistered = true;
    
      },
        (err: any) => {
          this.isRegistered = false;
        });

  }





 


}
