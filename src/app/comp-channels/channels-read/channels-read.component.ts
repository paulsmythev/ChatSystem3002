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

  authUserStorage: any = {}
  authUserMenu:boolean = false;

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
    this.dbservices.channelsDelete(id).subscribe((data)=> {
      this.channels = data;
    });
  }

  chatRoom(id) {
  }

  pagePermissions() {
  }

}
