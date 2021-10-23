import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { Channels } from 'src/app/classes/channels/channels';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-channels-current',
  templateUrl: './channels-current.component.html',
  styleUrls: ['./channels-current.component.css']
})
export class ChannelsCurrentComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService, private titleService:Title) { 
    this.titleService.setTitle("Chat System 3002 | Channels - Current");
  }

  chanUsers = new Array();

  channel_id:number = 0;

  displayChannels = new Array();

  menuDisplay:boolean = true;

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    console.log(this.chanUsers);

    //populate page data
    this.pageDisplay();

  }

  pageDisplay() {
    //Returns all the channels the current users is a member of.
    this.dbservices.groupsCurrent().subscribe((data)=> {
      if (data.authError == true) {
        this.router.navigateByUrl("/login");
      } else {
        for (let i = 0; i < data.length; i++) {
          this.channelsGroups(data[i]);
        }
      }
  
    });
    
  }

  channelsGroups(array) {
    this.dbservices.groupUsers(array.group_id).subscribe((dataP)=>{
      this.dbservices.channelsOne(array.group_id).subscribe((dataC)=>{
        for (let i = 0; i < dataC.length; i++) {
          this.chanUsers.push({"channel_id": dataC[i]._id,"createdBy_id": dataC[i].createdBy_id, "description": dataC[i].description, "groupPicture_id": dataC[i].groupPicture_id, "group_id": dataC[i].group_id, "channel_name": dataC[i].name, "group_name": array.name, "user_id": array.user_id, "username": array.username, "userList": dataP});
        }
        
      });
    });
  }

  joinChat(group_id, channel_id) {
    //Provides the route for the chat room
    this.router.navigateByUrl("/chat/read/" + group_id + "/" + channel_id);

  }

  pagePermissions() {
    //Checks user is authorised to preform action or view web page
    this.dbservices.authRead().subscribe((data)=> {
      if (data.length <= 0) {
        this.router.navigateByUrl("/login");

      } else if (data[0].role == "User") {
        this.router.navigateByUrl("/channels/current");
        this.menuDisplay = false;
        
      }
    });

  }

}
