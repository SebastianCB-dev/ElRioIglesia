import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { FirebaseService } from '../../services/firebase.service';

import { User } from '../../interface/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


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
    private messageService: MessageService,
    private userSrv: UserService,
    private router: Router
  ) { }

  async logout() {
    this.userSrv.logout();
    await this.router.navigateByUrl('/auth');
  }

  async searchUser(query: string, type: string) {    
    if(query.length === 0) return;
    this.isLoading = true;
    switch (type) {
      case 'ID':
        const idNumber = parseInt(query);
        if(!isNaN(idNumber)) {
          const usersByID = await this.firebaseSrv.getNinoByID(idNumber);
          if (usersByID && usersByID?.length > 0) {
            this.usersSearch = usersByID as User[];
            this.showMessageUsersLoaded();
            this.isLoading = false;
            return;
          }
        }
        this.showMessageUsersNotFound();
        this.usersSearch = [];
        this.isLoading = false;
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

  getSalon(user: User) {
    const edad: number = this.getEdad(user.dob);
    if (edad < 3) {
      return 'No aplicable';
    }
    if (edad >= 3 && edad <= 4) {
      return 'Salon 3-4';
    }
    else if (edad >= 5 && edad <= 6) {
      return 'Salon 5-6';
    }
    else if (edad >= 7 && edad <= 8) {
      return 'Salon 7-8';
    }
    else if (edad >= 9 && edad <= 10) {
      return 'Salon 9-10';
    }
    else if (edad >= 11 && edad <= 13) {
      return 'Salon 11-13';
    }
    else {
      return 'No aplicable';
    }
  }

  getEdad(dob: string) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dob)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }
}
