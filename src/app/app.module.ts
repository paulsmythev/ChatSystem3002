import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { UsersCreateComponent } from './comp-users/users-create/users-create.component';
import { UsersReadComponent } from './comp-users/users-read/users-read.component';
import { UsersCurrentComponent } from './comp-users/users-current/users-current.component';
import { ChannelsReadComponent } from './comp-channels/channels-read/channels-read.component';
import { ChannelsCreateComponent } from './comp-channels/channels-create/channels-create.component';
import { ChannelsCurrentComponent } from './comp-channels/channels-current/channels-current.component';
import { GroupsReadComponent } from './comp-groups/groups-read/groups-read.component';
import { GroupsCreateComponent } from './comp-groups/groups-create/groups-create.component';
import { GroupsCurrentComponent } from './comp-groups/groups-current/groups-current.component';
import { GroupsAssignedComponent } from './comp-groups/groups-assigned/groups-assigned.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UsersCreateComponent,
    UsersReadComponent,
    UsersCurrentComponent,
    ChannelsReadComponent,
    ChannelsCreateComponent,
    ChannelsCurrentComponent,
    GroupsReadComponent,
    GroupsCreateComponent,
    GroupsCurrentComponent,
    GroupsAssignedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
