import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  imageUpload(fd) {
    return this.http.post<any>("http://localhost:3000/api/image-upload", fd);
  }

}
