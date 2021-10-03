import { Component, OnInit } from '@angular/core';
import { Group } from "../../classes/groups/groups";
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-create',
  templateUrl: './groups-create.component.html',
  styleUrls: ['./groups-create.component.css']
})
export class GroupsCreateComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  newGroup:Group;

  inputName:string = "";
  inputDescription:string = "";
  createdBy_id:string = "";
  randomPic = "";

  ngOnInit(): void {
    //check user permissions
    this.pagePermissions();

    //clear errors
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";
  }

  addnewGroup(event) {
    event.preventDefault();

    //clear errors
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    if (this.inputName == "" || this.inputDescription == "") {
      let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
      error.innerText = "Missing Information";

    }

    this.randomPic = "g_" + this.imageGen() + ".png"

    this.newGroup = new Group(this.inputName.toLocaleLowerCase(), this.createdBy_id, this.inputDescription, this.randomPic);

    this.dbservices.groupsCreate(this.newGroup).subscribe((data)=>{
      if (data.groupsExists == true && data.groupCreated == false) {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Group already exists, try a new one";

      } else if (data.groupsExists == false, data.groupCreated == true) {
        let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
        good.innerText = "Group Created";
      }
      
    });

  }

  pagePermissions() {

  }

  imageGen() {
    return Math.floor(Math.random() * 5) + 1;
  }

}

