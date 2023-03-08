import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { FirebaseService } from '../../services/firebase.service';

import { User } from '../../interface/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  usersSearch: User[] = [];
  isLoading: boolean = false;

  constructor(
    private firebaseSrv: FirebaseService,
    private messageService: MessageService
  ) { }

  logout() {

  }

  async searchUser(query: string, type: string) {    
    if(query.length === 0) return;
    this.isLoading = true;
    switch (type) {
      case 'ID':
        console.log('Searching ID');
        break;
      case 'Nombre':
        const usersByName = await this.firebaseSrv.getNinoByName(query);
        if (usersByName && usersByName?.length > 0) {
          this.usersSearch = usersByName as User[];
          this.showMessageUsersLoaded();
          this.isLoading = false;
          return;
        }
        this.showMessageUsersNotFound();
        this.usersSearch = [];
        this.isLoading = false;
        break;
      case 'Identificacion':
        const usersByIdentificacion = await this.firebaseSrv.getNinoByDocument(query);
        if (usersByIdentificacion && usersByIdentificacion?.length > 0) {
          this.usersSearch = usersByIdentificacion as User[];
          this.showMessageUsersLoaded();
          this.isLoading = false;
          return;
        }
        this.showMessageUsersNotFound();
        this.usersSearch = [];
        this.isLoading = false;
        break;
    }
  }

  showMessageUsersLoaded() {
    this.messageService.add({
      severity: 'info',
      summary: 'Busqueda',
      detail: 'Registros cargados.'
    });
  }

  showMessageUsersNotFound() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Busqueda',
      detail: 'No se encontraron registros.'
    });
  }
}
