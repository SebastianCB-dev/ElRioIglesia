import { NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService
  ]
})
export class PrimengModule { }
