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
        component: AuthHomeComponent,
        title: 'El Río Iglesia | Auth'
      },
      {
        path: 'ninos/login',
        component: LoginComponent,
        title: 'El Río Iglesia | Niños Acceso'
      },
      {
        path: 'ninos/register',
        component: RegisterComponent,
        title: 'El Río Iglesia | Niños Registro'
      },
      {
        path: 'admin-leaders/login',
        component: LoginAdminLeaderComponent,
        title: 'El Río Iglesia | Acceso Líderes y Administradores'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
