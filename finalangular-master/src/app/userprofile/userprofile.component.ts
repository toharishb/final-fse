import { Component, OnInit } from '@angular/core';
import { User } from '../login/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: User;
  editFlag: boolean;
  constructor(private userservcie: UserService) {
    this.user = new User();
    this.editFlag = false;
   }

  ngOnInit() {
    this.userservcie.getUser().subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },err => {

      }
    );
  }

  openEditprofile(){
    this.editFlag=true;
  }
  changeFlag(){
    this.editFlag= false;
  }
  editProfileSave(){
    console.log(this.user);
    this.userservcie.editUser(this.user);
    this.editFlag=false;
  }

}
