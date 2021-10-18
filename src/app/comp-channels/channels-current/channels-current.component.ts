import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { Channels } from 'src/app/classes/channels/channels';

@Component({
  selector: 'app-channels-current',
  templateUrl: './channels-current.component.html',
  styleUrls: ['./channels-current.component.css']
})
export class ChannelsCurrentComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  channels:Channels[] = [];

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
    try {
      this.dbservices.channelsOne(array.group_id).subscribe((data)=>{
        for (let i = 0; i < data.length; i++) {
          this.channels.push(data[i]);
        }
      });
    } catch {
      
    }

  }

  leaveChannel(channels_id) {
    //Deletes the channel
    this.dbservices.channelsDelete(channels_id).subscribe((data)=> {
      this.channels = [];
      this.pageDisplay();
      
    })
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
