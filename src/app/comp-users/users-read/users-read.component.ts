import { Component, OnInit } from '@angular/core';
import { Users } from "../../classes/users/users";
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-read',
  templateUrl: './users-read.component.html',
  styleUrls: ['./users-read.component.css']
})
export class UsersReadComponent implements OnInit {

  users:Users[] = [];

  userRoleChange:string = "";

  authUserStorage: any = {};

  promoteLevel:boolean = false;

  constructor(private router: Router, private dbservices:DatabaseService) { }

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    this.dbservices.usersRead().subscribe((data)=> {
      this.users = data;
      
      if (this.users[0].username == "super") {
        this.users.shift();
      }

    });

  }

  deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.dbservices.usersDelete(id).subscribe((data)=> {
        this.users = data;
      
        if (this.users[0].username == "super") {
          this.users.shift();
        }

      });

    }

  }

  updateUser(id) {
    this.dbservices.usersUpdate(id, this.userRoleChange).subscribe((data)=> {
      this.users = data;
      
      if (this.users[0].username == "super") {
        this.users.shift();
      }
    });

  }

  pagePermissions() {
    //read in local storage for auth user, if not there redirec to login page
    var authUserFile = localStorage.getItem("authUser"); 
    if (authUserFile) {
      this.authUserStorage = JSON.parse(authUserFile);

    } else {
      this.router.navigateByUrl("/login");
    }

    if (this.authUserStorage.role == "Group Assistant" || this.authUserStorage.role == "User") {
      this.router.navigateByUrl("/users/current");

    }

    //allow to promote user to super admin
    if (this.authUserStorage.role == "Super Administrator") {
      this.promoteLevel = true;

    } else if (this.authUserStorage.role == "Group Administrator") {
      this.promoteLevel = false;

    }


  }

}
