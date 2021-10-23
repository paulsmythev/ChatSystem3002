import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from "../../services/database.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService, private titleService:Title) { 
    this.titleService.setTitle("Chat System 3002 | Logout");
  }

  ngOnInit(): void {
    //Removes users authorisation and redirects to login page
    localStorage.removeItem("authUser");
    this.router.navigateByUrl("/login");

    this.dbservices.authLogout().subscribe((data)=>{
      console.log(data)
    });
  }

}
