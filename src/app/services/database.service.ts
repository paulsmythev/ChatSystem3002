import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Authentication } from "../classes/authentication/authentication"

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  //Authentication

  authLogin(credentials:Authentication) {
    return this.http.post<any>("http://localhost:3000/api/auth-login", credentials)
  }
}
