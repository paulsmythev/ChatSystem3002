import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { Channel } from 'src/app/classes/channels/channels';
import { Groups } from 'src/app/classes/groups/groups';

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

  authUserStorage: any = {};
  authUserMenu:boolean = false;

  constructor(private router: Router, private dbservices:DatabaseService) { }

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    this.dbservices.groupsRead().subscribe((data)=> {
      this.groups = data;

    });
  }

  addnewChannel(event) {
    event.preventDefault();

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

      this.newChannel = new Channel(this.inputGroup_id, this.inputName, this.createdBy_id, this.inputDescription, this.randomPic);
    
      this.dbservices.channelsCreate(this.newChannel).subscribe((data)=> {
        if (data.channelExists == true && data.groupCreated == false) {
          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "Group already exists, try a new one";

        } else if (data.channelExists == false, data.channelCreated == true) {
          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "Group Created";
        }
      });

    }
    
  }

  imageGen() {
    return Math.floor(Math.random() * 50) + 1;
  }

  pagePermissions() {
    //read in local storage for auth user, if not there redirec to login page
    var authUserFile = localStorage.getItem("authUser"); 
    if (authUserFile) {
      this.authUserStorage = JSON.parse(authUserFile);

    } else {
      this.router.navigateByUrl("/login");
    }

    if (this.authUserStorage.role == "Super Administrator" || this.authUserStorage.role == "Group Administrator" || this.authUserStorage.role == "Group Assistant") {
      this.authUserMenu = true;

    } else {
      this.authUserMenu = false;
      this.router.navigateByUrl("/channels/current");
      
    }

  }

}
