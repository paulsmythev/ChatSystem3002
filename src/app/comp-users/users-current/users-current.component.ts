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

  menuDisplay:boolean = true;

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
    this.dbservices.authRead().subscribe((data)=> {
      if (data.length <= 0) {
        this.router.navigateByUrl("/login");

      } else if (data[0].role == "Group Assistant" || data[0].role == "User") {
        this.menuDisplay = false;
        
      }
    });

  }

}