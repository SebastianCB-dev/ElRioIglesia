import { NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  exports: [
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class PrimengModule { }
