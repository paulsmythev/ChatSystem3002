import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  imageChatUpload(fd) {
    return this.http.post<any>("http://localhost:3000/api/image-chat", fd);
  }

  imageUserUpload(fd) {
    return this.http.post<any>("http://localhost:3000/api/image-user", fd);
  }

}
