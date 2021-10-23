import { Component, OnInit } from '@angular/core';
import { Groups } from "../../classes/groups/groups";
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-groups-read',
  templateUrl: './groups-read.component.html',
  styleUrls: ['./groups-read.component.css']
})
export class GroupsReadComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService, private titleService:Title) { 
    this.titleService.setTitle("Chat System 3002 | Groups - Read");
  }

  groupsChannels = new Array();

  channel_id:number = 0;

  menuDisplay:boolean = true;

  ngOnInit(): void {
    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    //check user permissions
    this.pagePermissions();

    //populate page data
    this.pageDisplay();

  }

  pageDisplay() {
    //Collects all channels part of that group
    this.dbservices.groupsRead().subscribe((data)=>{//groupsCurrent
      if (data.length == 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Database Error";

      } else {
        for (let i = 0; i < data.length; i++) {
          this.channelsGroups(data[i]);

        }

      }

    });

  }

  channelsGroups(array) {
    this.dbservices.channelsOne(array._id).subscribe((data)=>{
      this.groupsChannels.push({"_id": array._id, "name": array.name, "createdBy_id": array.createdBy_id, "description": array.description, "groupPicture_id": array.groupPicture_id, "channels": data});
      
    });

  }

  deleteGroup(group_id) {
    //Deletes a group
    this.dbservices.groupsDelete(group_id).subscribe((data)=> {
      this.groupsChannels = [];
      this.pageDisplay();
    })
  }

  joinChat(group_id) {
    //Creates the route for the chat interface
    this.router.navigateByUrl("/chat/read/" + group_id + "/" + this.channel_id);
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
