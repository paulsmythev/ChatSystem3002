import { Component, OnInit } from '@angular/core';
import { Groups } from "../../classes/groups/groups";
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { GroupUser } from 'src/app/classes/groups_users/group-user';

@Component({
  selector: 'app-groups-current',
  templateUrl: './groups-current.component.html',
  styleUrls: ['./groups-current.component.css']
})
export class GroupsCurrentComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  groups:Groups[] = [];
  groupUser:GroupUser[] = [];

  displayArray = new Array();

  ngOnInit(): void {
    //check user permissions
    this.pagePermissions();

    this.dbservices.groupsCurrent().subscribe((data)=>{
      
      for (let i = 0; i < data.length; i++) {
        this.dbservices.groupsOne(data[i].group_id).subscribe((data)=> {
          this.displayArray.push(data[0]);
          this.displayArray = this.groups;
        });

      }
      
    });

  }

  deleteGroup(group_id) {
  }

  joinChat(groups_id, channel_id) {
  }

  pagePermissions() {
  }

}
