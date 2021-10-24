import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from "../../services/database.service";
import { Authentication } from 'src/app/classes/authentication/authentication';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService, private titleService:Title) { 
    this.titleService.setTitle("Chat System 3002 | Login");
  }
  
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
    //Connects via the server to verify user details
    event.preventDefault();

    if (this.inputIdentification == "" || this.inputPassword == "") {
      let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
      error.innerText = "Missing Information";

    } else {
      this.newLogin = new Authentication(this.inputIdentification.toLowerCase(), this.inputPassword.toLowerCase())

      this.dbservices.authLogin(this.newLogin).subscribe((data)=>{
        
        if (data.userLogin == false) {
          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "";

          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "Login Error!";
          
          this.inputIdentification = "";
          this.inputPassword = "";

        } else if (data.userLogin == true) {
          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "Successful Login, Redirecting!";

          this.inputIdentification = "";
          this.inputPassword = "";
          this.router.navigateByUrl("/groups/current");

        }


      });

    }

  }

  authorisationCheck() {
    //Checks user is authorised to preform action or view web page
    this.dbservices.authRead().subscribe((data)=>{

      if (data[0] == null) {
        
      } else {
        this.router.navigateByUrl("/groups/current");
      }
    });
  }

}
