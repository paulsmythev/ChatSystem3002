import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Authentication } from "../classes/authentication/authentication"
import { User } from "../classes/users/users";
import { Group } from '../classes/groups/groups';
import { Channel } from '../classes/channels/channels';
import { GroupUser } from '../classes/groups_users/group-user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  //Authentication

  authLogin(credentials:Authentication) {
    return this.http.post<any>("http://localhost:3000/api/auth-login", credentials);
  }

  authLogout() {
    return this.http.get<any>("http://localhost:3000/api/auth-logout");
  }

  authRead() {
    return this.http.get<any>("http://localhost:3000/api/auth-read");
  }

  //Users
  usersCreate(particulars:User) {
    return this.http.post<any>("http://localhost:3000/api/users-create", particulars)
  }

  usersRead() {
    return this.http.get<any>("http://localhost:3000/api/users-read");
  }

  usersDelete(_id) {
    return this.http.post<any>("http://localhost:3000/api/users-delete", {"_id":_id});
  }

  usersUpdate(_id, roleChange) {
    return this.http.post<any>("http://localhost:3000/api/users-update", {"_id":_id, "roleChange":roleChange});
  }

  usersOne(_id) {
    return this.http.post<any>("http://localhost:3000/api/users-one", {"_id":_id});
  }

  //Channels

  channelsCreate(particulars:Channel) {
    return this.http.post<any>("http://localhost:3000/api/channels-create", particulars)
  }

  channelsRead() {
    return this.http.get<any>("http://localhost:3000/api/channels-read");
  }

  channelsDelete(_id) {
    return this.http.post<any>("http://localhost:3000/api/channels-delete", {"_id":_id});
  }

  channelsCurrent(_id) {
    return this.http.post<any>("http://localhost:3000/api/channels-current", {"_id":_id});
  }

  //Groups

  groupsRead() {
    return this.http.get<any>("http://localhost:3000/api/groups-read");
  }

  groupsCreate(particulars:Group) {
    return this.http.post<any>("http://localhost:3000/api/groups-create", particulars)
  }

  groupsOne(_id) {
    return this.http.post<any>("http://localhost:3000/api/groups-one", {"_id":_id});
  }

  groupsAssigned(particulars:GroupUser) {
    return this.http.post<any>("http://localhost:3000/api/groups-assigned", particulars)
  }


}
