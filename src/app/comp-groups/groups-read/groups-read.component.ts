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

  ngOnInit(): void {
    //check user permissions
    this.pagePermissions();

    this.dbservices.groupsRead().subscribe((data)=>{

      if (data.length == 0) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "If you’re seeing this message RUN!";
      }

      this.groups = data;
      console.log(data);

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
  }

}
