import { NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [
    TableModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService
  ]
})
export class PrimengModule { }
