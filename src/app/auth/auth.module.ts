import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthHomeComponent } from './auth-home.component';
import { LoginComponent } from './ninos/login/login.component';
import { RegisterComponent } from './ninos/register/register.component';


@NgModule({
  declarations: [
    AuthHomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
