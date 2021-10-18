import { Component, OnInit } from '@angular/core';
import { User } from "../../classes/users/users";
import { DatabaseService } from "../../services/database.service";
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  inputEmail:string = "";
  inputUsername:string = "";
  inputPassword:string = "";
  role:string = "user";
  inputImageFile:string = "1.png";

  //file handling
  selectedFile;
  imagePath = "";

  newUser:User;

  menuDisplay:boolean = true;

  majorError:boolean = false;

  constructor(private router: Router, private dbservices:DatabaseService, private imageServices:ImageService) { }

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";
  }

  addnewUser(event) {
    //Handles the creation of new users
    event.preventDefault();
    
    if (this.selectedFile != null) {
      if (this.inputEmail == "" || this.inputPassword == "") {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Missing Information";
      } else {
        this.newUser = new User(this.inputEmail, this.inputUsername.toLowerCase(), this.inputPassword, this.role, this.selectedFile.name);
  
        this.dbservices.usersCreate(this.newUser).subscribe((data)=>{
        if (data.userExists == true && data.userCreated == false) {
          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "Username already exists, try a new one";
  
        } else if (data.userExists == false && data.userCreated == true) {
          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "User Created";
  
          this.inputEmail = "";
          this.inputUsername = "";
          this.inputPassword = "";
  
        }
  
        });

        this.onUpload();
      
      }
    } else {
      if (this.inputEmail == "" || this.inputPassword == "") {
        let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
        error.innerText = "Missing Information";
      } else {
        this.newUser = new User(this.inputEmail, this.inputUsername.toLowerCase(), this.inputPassword, this.role, this.inputImageFile);
  
        this.dbservices.usersCreate(this.newUser).subscribe((data)=>{
        if (data.userExists == true && data.userCreated == false) {
          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "Username already exists, try a new one";
  
        } else if (data.userExists == false && data.userCreated == true) {
          let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
          good.innerText = "User Created";
  
          this.inputEmail = "";
          this.inputUsername = "";
          this.inputPassword = "";
  
        }
  
        });
      
      }
    }
  }

  onFileSelected(event) {
    //Handles the picture for new users
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.imageServices.imageUserUpload(fd).subscribe(res=>{
      this.imagePath = res.data.filename;
      console.log(res.data.filename + " , " + res.data.size)
    });
  }

  pagePermissions() {
    //Uploads the image
    this.dbservices.authRead().subscribe((data)=> {
      if (data.length <= 0) {
        this.router.navigateByUrl("/login");

      } else if (data[0].role == "Group Assistant" || data[0].role == "User") {
        this.router.navigateByUrl("/users/current");
        this.menuDisplay = false;
      }
    });

  }

}


