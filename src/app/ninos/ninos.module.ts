import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NinosRoutingModule } from './ninos-routing.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    NinosRoutingModule
  ]
})
export class NinosModule { }
