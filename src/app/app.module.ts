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
    ChannelsCurrentComponent
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
