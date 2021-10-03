import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-read',
  templateUrl: './chat-read.component.html',
  styleUrls: ['./chat-read.component.css']
})
export class ChatReadComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  group_id:string = "";
  channel_id:string = "";

  ngOnInit(): void {
    //Get ActivatedRoute
    this.group_id = this.route.snapshot.params["group"];
    this.channel_id = this.route.snapshot.params["channel"];

  }

}
