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

  channels:Channels[] = [];

  menuDisplay:boolean = true;

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    this.dbservices.channelsRead().subscribe((data)=>{
      if (data.length < 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Database Read Error!";

      } else {
        this.channels = data;
      }

    });

  }

  deleteGroup(id) {
    //Deletes the group
    this.dbservices.channelsDelete(id).subscribe((data)=> {
      if (data.authError == true) {
        this.router.navigateByUrl("/login");
      } else {
        this.channels = data;
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

      } else if (data[0].role == "User") {
        this.router.navigateByUrl("/channels/current");
        this.menuDisplay = false;
        
      }
    });

  }

}
