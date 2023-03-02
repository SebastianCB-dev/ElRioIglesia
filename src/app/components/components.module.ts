import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengModule } from '../primeng/primeng.module';

import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class ComponentsModule { }
