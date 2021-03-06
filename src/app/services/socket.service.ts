import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  //Sends out messages 

  public send(message:string): void {
    this.socket.emit('message', message);
  }

  //Receives messages

  public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:string)=> observer.next(data));
    });
    return observable;
  }

  //testing functionality

  chatStart(chat_id) {
    this.socket.emit('chatStart', chat_id);
  }

}