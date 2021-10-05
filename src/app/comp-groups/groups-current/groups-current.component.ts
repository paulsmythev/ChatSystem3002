import { Component, OnInit } from '@angular/core';
import { Groups } from "../../classes/groups/groups";
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { GroupUser } from 'src/app/classes/groups_users/group-user';

@Component({
  selector: 'app-groups-current',
  templateUrl: './groups-current.component.html',
  styleUrls: ['./groups-current.component.css']
})
export class GroupsCurrentComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  groups:Groups[] = [];
  groupUser:GroupUser[] = [];

  displayArray = new Array();

  menuDisplay:boolean = true;

  ngOnInit(): void {
    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    //check user permissions
    this.pagePermissions();

    this.dbservices.groupsCurrent().subscribe((data)=>{

      if (data.length < 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Database Error";

      } else {
        for (let i = 0; i < data.length; i++) {
          this.dbservices.groupsOne(data[i].group_id).subscribe((data)=> {
            this.displayArray.push(data[0]);
            this.displayArray = this.groups;
            console.log(data[0].name);
            //is dropping one group off, something to do with array count
          });
  
        }
        
      }
      
    });

  }

  deleteGroup(group_id) {
    this.dbservices.groupsDelete(group_id).subscribe((data)=> {
      this.groups = data;
    })
  }

  joinChat(group_id, channel_id) {
    this.router.navigateByUrl("/chat/read/" + group_id + "/" + channel_id);
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
