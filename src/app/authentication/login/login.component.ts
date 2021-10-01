import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { DatabaseService } from "../../services/database.service";

import { Authentication } from 'src/app/classes/authentication/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  inputIdentification:string = "";
  inputPassword:string = "";

  newLogin:Authentication;

  ngOnInit(): void {

    //check user status
    this.authorisationCheck();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";
  }

  userLogin(event) {
    event.preventDefault();

    if (this.inputIdentification == "") {
      let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
      error.innerText = "Missing Information";

    } else {
      this.newLogin = new Authentication(this.inputIdentification, this.inputPassword)

      this.dbservices.authLogin(this.newLogin).subscribe((data)=>{

        if (data.userExists == false) {
          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "";

          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "Login Error!";
          
          this.inputIdentification = "";
          this.inputPassword = "";

        } else if (data.length == 1) {
          let authenticatedUser = {"status":true, "_id":data[0]._id, "username":data[0].username, "email":data[0].email, "role":data[0].role, "profilepicture":data[0].profilepicture};
          localStorage.setItem("authUser", JSON.stringify(authenticatedUser));

          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "Successful Login, Redirecting!";

          this.inputIdentification = "";
          this.inputPassword = "";
          //this.router.navigateByUrl("/groupsall");

        }

      });

    }

  }

  authorisationCheck() {
    //if the user is logged in, they will be redirected
    let checkStorage = localStorage.getItem("authUser");
    let phaseStorage: any = {};

    if (checkStorage) {
      phaseStorage = JSON.parse(checkStorage);
    }
    
    if (phaseStorage.status == true) {
      //this.router.navigateByUrl("/groupsall");
      console.log("navigateByUrl");
    }

  }

}
