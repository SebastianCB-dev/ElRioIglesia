import { NgModule } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

import { MessageService } from 'primeng/api';

@NgModule({
  exports: [
    DialogModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService
  ]
})
export class PrimengModule { }
