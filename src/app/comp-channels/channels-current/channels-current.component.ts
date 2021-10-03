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

  authUserMenu:boolean = false;

  user_id:number = 0;

  displayArray = new Array();

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    this.dbservices.channelsCurrent().subscribe((data)=> {
      
      if (data.length < 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Database Error";

      } else {
        for (let i = 0; i < data.length; i++) {
          this.dbservices.channelsOne(data[i].group_id).subscribe((data)=> {
            this.displayArray.push(data[0]);
            this.displayArray = this.channels;
            console.log(data[0].name);
            //is dropping one group off, something to do with array count
          });
  
        }
        
      }

    });

  }

  leaveChannel(channels_id) {
    this.dbservices.channelsDelete(channels_id).subscribe((data)=> {
      this.channels = data;
    })
  }

  joinChat(group_id, channel_id) {
    this.router.navigateByUrl("/chat/read/" + group_id + "/" + channel_id);
  }

  pagePermissions() {
  }

}
