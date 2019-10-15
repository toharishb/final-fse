import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from './User';
import { Register } from '../register/Register';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  username = new FormControl();
  password = new FormControl();
  submitMessage: String;
  userobj: Register;
  private bearerToken: string;
  
  constructor(private authservice: AuthenticationService, private routerservice: RouterService) {
    this.userobj = new Register();
    
  }

  ngOnInit() {
    
  }

  loginSubmit() {
    this.authservice.authenticateUser({
      userId: this.username.value,
      userPassword: this.password.value
    }).subscribe(
      res => {
        this.bearerToken = res['token'];
        this.authservice.setBearerToken(this.bearerToken);
        this.routerservice.routeToDashboard();
        console.log('hi');
     },
    err => {
      if (err.status === 403) {
        this.submitMessage = err.error.message;
      } else {
        this.submitMessage = err.message;
      }
    });
  }

  routeToRegistration(){
    this.routerservice.routeToRegister();
  }
}
