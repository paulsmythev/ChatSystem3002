import { Component, OnInit } from '@angular/core';
import { Groups } from "../../classes/groups/groups";
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-read',
  templateUrl: './groups-read.component.html',
  styleUrls: ['./groups-read.component.css']
})
export class GroupsReadComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  groups:Groups[] = [];

  menuDisplay:boolean = true;

  ngOnInit(): void {
    //check user permissions
    this.pagePermissions();

    this.dbservices.groupsRead().subscribe((data)=>{
      if (data.authenticationStatus == false) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Server Side Authentication Error";
      } else {
        this.groups = data;
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
        this.router.navigateByUrl("/groups/current");
        this.menuDisplay = false;
        
      }
    });

  }

}
