import { Component, OnInit } from '@angular/core';
import { Register } from './Register';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { RegistrationService } from '../services/registration.service';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register : Register;
  username = new FormControl();
  password = new FormControl();
  firstName = new FormControl();
  lastName = new FormControl();

  constructor(private registerService: RegistrationService, private routerservice: RouterService,
  private userService: UserService) { 
    this.register = new Register();
  }

  ngOnInit() {
  }
  onSubmit(){
    
    this.register.userId = this.username.value;
    this.register.firstName = this.firstName.value;
    this.register.lastName = this.lastName.value;
    this.register.userPassword = this.password.value;
    console.log(this.register);
    this.registerService.registerUser(this.register);
    //this.userService.registerUser(this.register);
    
    setTimeout(() => {
      if(this.registerService.isregistered()){
        alert("Success!! Please Login to continue");
        this.routerservice.routeToLogin();
      }else{
        alert("Error Please try again!!!");
      
      }
    },1500);
    

  }

}
