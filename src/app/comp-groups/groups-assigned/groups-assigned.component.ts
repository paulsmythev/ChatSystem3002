import { Component, OnInit } from '@angular/core';
import { Groups } from 'src/app/classes/groups/groups';
import { Users } from 'src/app/classes/users/users';
import { GroupUser } from 'src/app/classes/groups_users/group-user';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-groups-assigned',
  templateUrl: './groups-assigned.component.html',
  styleUrls: ['./groups-assigned.component.css']
})
export class GroupsAssignedComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService, private titleService:Title) { 
    this.titleService.setTitle("Chat System 3002 | Groups - Assigned");
  }

  //Creates the relationship between groups and users

  groups:Groups[] = [];
  users:Users[] = [];

  inputGroup_id:string = "";
  inputGroup_name:string = "";
  inputUser_id:string = "";
  inputUsername:string = "";

  newGroupuser:GroupUser;

  menuDisplay:boolean = true;

  ngOnInit(): void {
    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    //check user permissions
    this.pagePermissions();

    //Get a list of the groups to show in a drop down 
    this.dbservices.groupsRead().subscribe((data)=> {
      if (data.length == 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "If you’re seeing this message RUN!";
      }

      this.groups = data;

    });

    //Get a list of the users to show in a drop down 
    this.dbservices.usersRead().subscribe((data)=>{
      if (data.length == 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "If you’re seeing this message RUN!";
      }

      this.users = data;

    });
  }

  attachUser() {
    //Creates the relationship in the database

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    if (this.inputGroup_id == "" || this.inputUser_id == "") {
      let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
      error.innerText = "Missing Information";

    } else {
      this.dbservices.usersOne(parseInt(this.inputUser_id)).subscribe((dataUser)=> {
        this.dbservices.groupsOne(parseInt(this.inputGroup_id)).subscribe((dataGroup)=> {
          this.newGroupuser = new GroupUser(parseInt(this.inputGroup_id), dataGroup[0].name, parseInt(this.inputUser_id), dataUser[0].username);

          this.dbservices.groupsAssigned(this.newGroupuser).subscribe((data)=>{
            if (data.previousExists == false && data.insertedData == true) {
              let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
              good.innerText = "Relationship Created";

            } else {
              let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
              error.innerText = "Relationship Already Exists";

            }
          });//end this.dbservices.groupsAssigned

        });//end this.dbservices.groupsOne
      });//end this.dbservices.usersOne
    }//end if

  }

  pagePermissions() {
    //Checks user is authorised to preform action or view web page
    this.dbservices.authRead().subscribe((data)=> {
      if (data.length <= 0) {
        this.router.navigateByUrl("/login");

      } else if (data[0].role == "Group Assistant" || data[0].role == "User") {
        this.router.navigateByUrl("/groups/current");
        this.menuDisplay = false;
        
      }
    });

  }

}
