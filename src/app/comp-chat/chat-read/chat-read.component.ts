import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { DatabaseService } from "../../services/database.service";
import { Users } from "../../classes/users/users";
import { Groups } from 'src/app/classes/groups/groups';
import { Channels } from 'src/app/classes/channels/channels';

@Component({
  selector: 'app-chat-read',
  templateUrl: './chat-read.component.html',
  styleUrls: ['./chat-read.component.css']
})
export class ChatReadComponent implements OnInit {

  constructor(private route: ActivatedRoute, private socketService:SocketService, private dbservices:DatabaseService) { }

  messagecontent:string = "";
  messages:string[] = [];
  ioConnection:any;

  chatLogs:any = [];

  chatUsers:any = [];

  group_id:number = 0;
  channel_id:number = 0;

  //page heading
  group_name:string = "";
  channel_name:string ="";
  channel_description = "";

  ngOnInit(): void {
    //Get ActivatedRoute
    this.group_id = parseInt(this.route.snapshot.params["group"]);
    this.channel_id = parseInt(this.route.snapshot.params["channel"]);

    this.initIoConnection();

    this.chatHistory();

    this.groupUsers();

    this. pageinfo();
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message:string) => {
      this.messages.push(message,);
    });
  }

   chat() {
    if (this.messagecontent) {
      this.socketService.send(this.messagecontent);
      this.messagecontent = "";

    } else {
      console.log("no message");
    }

  }

  chatHistory() {
    this.dbservices.chatRead(this.group_id, this.channel_id).subscribe((data)=>{
      this.chatLogs = data[0].chatlog;
      console.log(this.chatLogs);

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

}
/*
let good:HTMLHeadingElement = document.getElementById("good") as HTMLHeadingElement;
    good.innerText = "";
*/
