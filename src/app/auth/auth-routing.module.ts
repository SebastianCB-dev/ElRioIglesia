import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthHomeComponent } from './auth-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AuthHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
