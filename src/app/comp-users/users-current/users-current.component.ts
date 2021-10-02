import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-current',
  templateUrl: './users-current.component.html',
  styleUrls: ['./users-current.component.css']
})
export class UsersCurrentComponent implements OnInit {

  constructor(private router: Router) { }

  authUserStorage: any = {};
  authUserMenu:boolean = false;

  username:string = "";
  email:string = "";
  role:string = "";
  profilepicture:string = "";

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

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

  pagePermissions() {
    //read in local storage for auth user, if not there redirec to login page
    var authUserFile = localStorage.getItem("authUser"); 
    if (authUserFile) {
      this.authUserStorage = JSON.parse(authUserFile);

    } else {
      this.router.navigateByUrl("/login");
    }

    if (this.authUserStorage.role == "Super Administrator" || this.authUserStorage.role == "Group Administrator") {
      this.authUserMenu = true;

    } else {
      this.authUserMenu = false;

    }

  }

}