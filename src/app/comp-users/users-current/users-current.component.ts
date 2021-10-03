import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from "../../classes/users/users";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: 'app-users-current',
  templateUrl: './users-current.component.html',
  styleUrls: ['./users-current.component.css']
})
export class UsersCurrentComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  authUserStorage: any = {};
  authUserMenu:boolean = false;

  username:string = "";
  email:string = "";
  role:string = "";
  profilepicture:string = "";

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    this.pullAuthuser();
    
  }

  pullAuthuser() {
    this.dbservices.authRead().subscribe((data)=>{
      this.username = data[0].username;
      this.email = data[0].email;
      this.role = data[0].role;
      this.profilepicture = data[0].profilepicture;
    });
  }

  pagePermissions() {
  }

}