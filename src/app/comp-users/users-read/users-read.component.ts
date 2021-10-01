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

  constructor(private router: Router, private dbservices:DatabaseService) { }

  ngOnInit(): void {
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

}
