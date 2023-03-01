import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthHomeComponent } from './auth-home.component';
import { LoginComponent } from './ninos/login/login.component';
import { RegisterComponent } from './ninos/register/register.component';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [
    AuthHomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class AuthModule { }
