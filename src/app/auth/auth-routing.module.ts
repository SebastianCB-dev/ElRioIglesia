import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminLeaderComponent } from './adminLeader/login/login.component';

import { AuthHomeComponent } from './auth-home.component';
import { LoginComponent } from './ninos/login/login.component';
import { RegisterComponent } from './ninos/register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AuthHomeComponent
      },
      {
        path: 'ninos/login',
        component: LoginComponent
      },
      {
        path: 'ninos/register',
        component: RegisterComponent
      },
      {
        path: 'admin-leaders/login',
        component: LoginAdminLeaderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
