import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { DatabaseService } from "../../services/database.service";
import { ChatMessages } from 'src/app/classes/chatMessages/chat-messages';
import { ChatMessage } from 'src/app/classes/chatMessages/chat-messages';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-chat-read',
  templateUrl: './chat-read.component.html',
  styleUrls: ['./chat-read.component.css']
})
export class ChatReadComponent implements OnInit {

  constructor(private route: ActivatedRoute, private socketService:SocketService, private dbservices:DatabaseService, private imageServices:ImageService) { }

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
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message:string) => {
      this.messages.push(message,);

      //passes value in messages array
      this.ChatMessages.push(JSON.parse(message));
      
    });
  }

  chat() {

    //check for file
    if (this.selectedFile != null) {
      this.onUpload();
      
    }

    //build chat message
    this.dbservices.authRead().subscribe((data)=>{
      let dateTime = new Date().toLocaleString();
      this.newMessage = new ChatMessage(data[0]._id, data[0].username, dateTime, this.messagecontent, data[0].profilepicture, false, "");
      
      if (this.messagecontent) {
        this.socketService.send(JSON.stringify(this.newMessage));
        this.messagecontent = "";
      } else {
        console.log("no message");
      }

      //save in database
      this.dbservices.chatCreate(this.newMessage).subscribe((data)=>{

      });

    });

  }

  chatHistory() {
    this.dbservices.chatRead(this.group_id, this.channel_id).subscribe((data)=>{
      this.ChatMessages = data[0].chatlog;

    });
  }

  groupUsers() {
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
    this.dbservices.groupsOne(this.group_id).subscribe((data)=>{
      this.group_name = data[0].name;
    });
    this.dbservices.channelsChannels(this.channel_id).subscribe((data)=>{
      this.channel_name = data[0].name;
      this.channel_description = data[0].description;
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile.name);
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.imageServices.imageUpload(fd).subscribe(res=>{
      console.log(res);
      //this.imagePath = res.data.filename;
      //console.log(res.data.filename + " , " + res.data.size)
    });
  }

}