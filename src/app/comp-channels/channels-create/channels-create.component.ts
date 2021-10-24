import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { Channel } from 'src/app/classes/channels/channels';
import { Groups } from 'src/app/classes/groups/groups';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-channels-create',
  templateUrl: './channels-create.component.html',
  styleUrls: ['./channels-create.component.css']
})
export class ChannelsCreateComponent implements OnInit {

  channel:Channel[] = [];
  groups:Groups[] = [];
  newChannel:Channel;

  inputName:string = "";
  createdBy_id:string = "";
  inputGroup_id:number = 0;
  inputDescription:string = "";
  randomPic = "";

  menuDisplay:boolean = true;

  constructor(private router: Router, private dbservices:DatabaseService, private titleService:Title) { 
    this.titleService.setTitle("Chat System 3002 | Channels - Create");
  }

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    //Populates drop down list
    this.dbservices.groupsRead().subscribe((data)=> {
      this.groups = data;  

    });
    
    
  }

  addnewChannel(event) {
    event.preventDefault();

    let group_number = Number(this.inputGroup_id);

    console.log(this.inputGroup_id);

    //clear errors
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    if (this.inputName == "" || this.inputDescription == "") {
      let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
      error.innerText = "Missing Information";
    } else {

      let getUser = localStorage.getItem("authUser");
      if (getUser) {
        let extractUserId = JSON.parse(getUser);
        this.createdBy_id = extractUserId.username;
      }

      this.randomPic = this.imageGen() + ".png"

      this.newChannel = new Channel(group_number, this.inputName.toLowerCase(), this.createdBy_id, this.inputDescription, this.randomPic);
    
      this.dbservices.channelsCreate(this.newChannel).subscribe((data)=> {
        if (data.channelExists == true) {
          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "Channel already exists, try a new one";

        } else if (data.acknowledged == true) {
          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "Channel Created";

          this.generateChatlog(group_number, data.insertedId);

          this.inputName = "";
          this.inputGroup_id = 0;
          this.inputDescription = "";

        } else if (data.authError == true) {
          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "User is not authorised to preform this task";
        }

      });

    }
    
  }

  imageGen() {
    //Selects a random image to be used as channel pic 
    return Math.floor(Math.random() * 50) + 1;
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

  generateChatlog(group_id, channel_id) {
    //Creates associated chatlog to ensure chat works for the channel
    let group_channel = {"group_id":group_id , "channel_id":channel_id}
    this.dbservices.chatlogChannel(group_channel).subscribe((data)=>{
    
    });
  }

}
