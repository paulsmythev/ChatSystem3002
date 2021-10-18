import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { DatabaseService } from "../../services/database.service";
import { ChatMessages } from 'src/app/classes/chatMessages/chat-messages';
import { ChatMessage } from 'src/app/classes/chatMessages/chat-messages';
import { ImageService } from 'src/app/services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-read',
  templateUrl: './chat-read.component.html',
  styleUrls: ['./chat-read.component.css']
})
export class ChatReadComponent implements OnInit {

  constructor(private route: ActivatedRoute, private socketService:SocketService, private dbservices:DatabaseService, private imageServices:ImageService, private router: Router) { }

  messagecontent:string = "";
  messages:string[] = [];
  ioConnection:any;

  ChatMessages:ChatMessages[] = [];
  newMessage:ChatMessage;

  chatUsers:any = [];

  group_id:number = 0;
  channel_id:number = 0;

  //file handling
  selectedFile;
  imagePath = "";

  //page heading
  group_name:string = "";
  channel_name:string ="";
  channel_description = "";

  ngOnInit(): void {

    //check user permissions
    this.pagePermissions();

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    //Get ActivatedRoute
    this.group_id = parseInt(this.route.snapshot.params["group"]);
    this.channel_id = parseInt(this.route.snapshot.params["channel"]);

    this.initIoConnection();

    this.chatHistory();

    this.groupUsers();

    this.pageinfo();

  }

  private initIoConnection(){
    //Starts the socket connection
    this.socketService.initSocket();

    let chat_id = {"group_id": this.group_id, "channel_id": this.channel_id}
    this.socketService.chatStart(chat_id);

    this.ioConnection = this.socketService.onMessage().subscribe((message:string) => {
      this.messages.push(message,);

      //checks for this channel
      let localMessage = JSON.parse(message);

      if (localMessage.group_id == this.group_id && localMessage.channel_id == this.channel_id) {
        this.ChatMessages.push(localMessage);
      }
      
    });
   
  }

  chat() {

    //clear error handling
    let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
    error.innerText = "";
    let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";

    //Takes in new chat messages and sends it to the sockets and save a record in the history
    if (this.messagecontent == "") {
      let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
      error.innerText = "Missing Information";

    } else if (this.selectedFile != null) {
        //build chat message
        this.dbservices.authRead().subscribe((data)=>{
          if (data.length == 0) {
            let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
            error.innerText = "Missing Authentication or Image handling Problem";
          } else {
            let dateTime = new Date().toLocaleString();
            this.newMessage = new ChatMessage(this.group_id, this.channel_id, data[0]._id, data[0].username, dateTime, this.messagecontent, data[0].profilepicture, true, this.selectedFile.name);

            if (this.messagecontent) {
              this.socketService.send(JSON.stringify(this.newMessage));
              this.messagecontent = "";
            } else {
              console.log("no message");
            }

            //save in database
            this.dbservices.chatCreate(this.newMessage).subscribe((data)=>{

            });
          }
        });

      this.onUpload();

    } else {
      //build chat message
      this.dbservices.authRead().subscribe((data)=>{
        if (data.length == 0) {
          let error:HTMLHeadingElement = document.getElementById("bad") as HTMLHeadingElement;
          error.innerText = "Missing Authentication or Image handling Problem";
        } else {
          let dateTime = new Date().toLocaleString();
          this.newMessage = new ChatMessage(this.group_id, this.channel_id, data[0]._id, data[0].username, dateTime, this.messagecontent, data[0].profilepicture, false, "");

          if (this.messagecontent) {
            this.socketService.send(JSON.stringify(this.newMessage));
            this.messagecontent = "";
          } else {
            console.log("no message");
          }

          //save in database
          this.dbservices.chatCreate(this.newMessage).subscribe((data)=>{

          });
        }
      });
    }

  }

  chatHistory() {
    this.dbservices.chatRead(this.group_id, this.channel_id).subscribe((data)=>{
      this.ChatMessages = data[0].chatlog;

    });
  }

  groupUsers() {
    //Loads in previous history
    this.dbservices.groupUsers(this.group_id).subscribe((data)=>{
      for (let i = 0; i < data.length; i++) {
        this.dbservices.usersOne(data[i].user_id).subscribe((data)=>{
          this.passUsers(data[0]);
        });
      }
    });
  }

  passUsers(array) {
    this.chatUsers.push(array);
    
  }

  pageinfo() {
    //Get the information about the group and channel
    this.dbservices.groupsOne(this.group_id).subscribe((data)=>{
      this.group_name = data[0].name;
    });
    this.dbservices.channelsChannels(this.channel_id).subscribe((data)=>{
      this.channel_name = data[0].name;
      this.channel_description = data[0].description;
    });
  }

  onFileSelected(event) {
    //Collects the image
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    //Process the image upload
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.imageServices.imageChatUpload(fd).subscribe(res=>{
      this.imagePath = res.data.filename;
      console.log(res.data.filename + " , " + res.data.size)
    });
  }

  pagePermissions() {
    //Checks user is authorised to preform action or view web page
    this.dbservices.authRead().subscribe((data)=> {
      if (data.length <= 0) {
      this.router.navigateByUrl("/login");
  
      }
    });
  }

}