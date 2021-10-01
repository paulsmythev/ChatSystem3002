import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-current',
  templateUrl: './users-current.component.html',
  styleUrls: ['./users-current.component.css']
})
export class UsersCurrentComponent implements OnInit {

  constructor() { }

  authUserStorage: any = {};

  username:string = "";
  email:string = "";
  role:string = "";
  profilepicture:string = "";

  ngOnInit(): void {
    //fetches details from local strage
    var authUserFile = localStorage.getItem("authUser"); 
    if (authUserFile) {
      this.authUserStorage = JSON.parse(authUserFile);

    }

    this.username = this.authUserStorage.username;
    this.email = this.authUserStorage.email;
    this.role = this.authUserStorage.role;
    this.profilepicture = this.authUserStorage.profilepicture;
    
  }

}