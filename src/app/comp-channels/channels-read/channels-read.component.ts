import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { Channels } from 'src/app/classes/channels/channels';

@Component({
  selector: 'app-channels-read',
  templateUrl: './channels-read.component.html',
  styleUrls: ['./channels-read.component.css']
})
export class ChannelsReadComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  chanUsers = new Array();

  menuDisplay:boolean = true;

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //populate page data
    this.pageDisplay();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

  }

  pageDisplay() {
    this.dbservices.channelsRead().subscribe((data)=>{
      if (data.length < 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Database Read Error!";

      } else {
        for (let i = 0; i < data.length; i++) {
          this.channelUsers(data[i]);

        }

      }

    });

  }

  channelUsers(array) {
    this.dbservices.groupUsers(array.group_id).subscribe((data)=>{
      this.chanUsers.push({"_id": array._id, "group_id": array.group_id, "groupName":data[0].name, "name": array.name, "createdBy_id": array.createdBy_id, "description": array.description, "groupPicture_id": array.groupPicture_id, "listUsers": data});
    });
    
  }

  deleteGroup(id) {
    //Deletes the group
    this.dbservices.channelsDelete(id).subscribe((data)=> {
      if (data.authError == true) {
        this.router.navigateByUrl("/login");
      } else {
        this.chanUsers = [];
        this.pageDisplay();
      }
    });
  }

  chatRoom(group_id, channel_id) {
     //Provides the route for the chat room
    this.router.navigateByUrl("/chat/read/" + group_id + "/" + channel_id);
  }

  pagePermissions() {
    //Checks user is authorised to preform action or view web page
    this.dbservices.authRead().subscribe((data)=> {
      if (data.length <= 0) {
        this.router.navigateByUrl("/login");

      } else if (data[0].role == "Group Assistant" || data[0].role == "User") {
        this.router.navigateByUrl("/channels/current");
        this.menuDisplay = false;
        
      }
    });

  }

}
