import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reject } from 'q';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNoteView = true;
  url: String;
  isloggedIn: Boolean = false;

  constructor(private urlref: Router, private routerservice: RouterService,
  private authServcie: AuthenticationService) {

  }
  ngOnInit() {

    this.authServcie.getLoginflag().subscribe(
      data => {
        this.isloggedIn = data;
        if(!data){
          const value = this.authServcie.isLoggedin();
          if(value == 'true'){
            this.isloggedIn = true;
          }
        }
        console.log('inside login falg'+ this.isloggedIn);
      },err => {

      }
    );
    
    

  }

 userprofileRoute(){
    this.routerservice.routeToUserProfilePage();
  }
  
  logout(){
    this.authServcie.logout();
    this.routerservice.routeToLogin();
  }

}
