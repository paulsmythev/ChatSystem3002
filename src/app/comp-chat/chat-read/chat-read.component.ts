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

  groups:Groups[] = [];
  channels:Channels[] = [];

  users:Users[] = [];

  group_id:number = 0;
  channel_id:number = 0;

  //page heading
  group_name:string = "";
  channel_name:string ="";

  ngOnInit(): void {
    //Get ActivatedRoute
    this.group_id = parseInt(this.route.snapshot.params["group"]);
    this.channel_id = parseInt(this.route.snapshot.params["channel"]);

    this.dbservices.groupsOne(this.group_id).subscribe((data)=>{
      this.groups = data;
      this.group_name = data[0].name;

    });

    this.dbservices.channelsChannels(this.channel_id).subscribe((data)=>{
      this.channels = data;
      this.channel_name = data[0].name;

    });

    this.dbservices.chatHistory(this.group_id, this.channel_id).subscribe((data)=>{
      console.log(data);
    });

    this.initIoConnection();

    this.getUsers();

    //testing
    this.dbservices.chatRead().subscribe((data)=> {
      //console.log(data[0].chatlog[0]);
      //console.log(data[0].chatlog.length);
      //console.log(data);
    });

  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message:string) => {
      this.messages.push(message);
    });
  }

   chat() {
    if (this.messagecontent) {
      this.socketService.send(this.messagecontent);
      this.messagecontent = "";//this.messagecontent = null;

    } else {
      console.log("no message");
    }

  }

  getUsers() {
    this.dbservices.usersRead().subscribe((data)=> {
      this.users = data;

    });

  }

}
