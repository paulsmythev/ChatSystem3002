import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private dbservices:DatabaseService) { }

  ngOnInit(): void {
    //remove local storage and return user to login page
    localStorage.removeItem("authUser");
    this.router.navigateByUrl("/login");

    this.dbservices.authLogout().subscribe((data)=>{
      console.log(data)
    });
  }

}
