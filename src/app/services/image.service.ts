import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  //Handles chat uploads

  imageChatUpload(fd) {
    return this.http.post<any>("http://localhost:3000/api/image-chat", fd);
  }

  //Handles new user profile pics

  imageUserUpload(fd) {
    return this.http.post<any>("http://localhost:3000/api/image-user", fd);
  }

}
