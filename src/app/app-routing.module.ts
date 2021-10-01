import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';

import { UsersCreateComponent } from './comp-users/users-create/users-create.component';
import { UsersCurrentComponent } from './comp-users/users-current/users-current.component';
import { UsersReadComponent } from './comp-users/users-read/users-read.component';

const routes: Routes = [{path: "login", component: LoginComponent},
                        {path: "logout", component: LogoutComponent},
                        {path: "", redirectTo: "login", pathMatch: "full"},

                        {path: "users/create", component: UsersCreateComponent},
                        {path: "users/current", component: UsersCurrentComponent},
                        {path: "users/read", component: UsersReadComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
