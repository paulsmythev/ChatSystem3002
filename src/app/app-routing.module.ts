import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';

import { UsersCreateComponent } from './comp-users/users-create/users-create.component';
import { UsersCurrentComponent } from './comp-users/users-current/users-current.component';
import { UsersReadComponent } from './comp-users/users-read/users-read.component';

import { ChannelsCreateComponent } from './comp-channels/channels-create/channels-create.component';
import { ChannelsCurrentComponent } from './comp-channels/channels-current/channels-current.component';
import { ChannelsReadComponent } from './comp-channels/channels-read/channels-read.component';

import { GroupsAssignedComponent } from './comp-groups/groups-assigned/groups-assigned.component';
import { GroupsCreateComponent } from './comp-groups/groups-create/groups-create.component';
import { GroupsCurrentComponent } from './comp-groups/groups-current/groups-current.component';
import { GroupsReadComponent } from './comp-groups/groups-read/groups-read.component';

import { ChatReadComponent } from './comp-chat/chat-read/chat-read.component';

const routes: Routes = [{path: "login", component: LoginComponent},
                        {path: "logout", component: LogoutComponent},
                        {path: "", redirectTo: "login", pathMatch: "full"},

                        {path: "users/create", component: UsersCreateComponent},
                        {path: "users/current", component: UsersCurrentComponent},
                        {path: "users/read", component: UsersReadComponent},

                        {path: "channels/create", component: ChannelsCreateComponent},
                        {path: "channels/current", component: ChannelsCurrentComponent},
                        {path: "channels/read", component: ChannelsReadComponent},

                        {path: "groups/assigned", component: GroupsAssignedComponent},
                        {path: "groups/create", component: GroupsCreateComponent},
                        {path: "groups/current", component: GroupsCurrentComponent},
                        {path: "groups/read", component: GroupsReadComponent},

                        {path: "chat/read/:group/:channel", component: ChatReadComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
