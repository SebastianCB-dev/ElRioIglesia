import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from 'src/app/services/user.service';

import { User } from '../../interface/user';

import { getEdad, getSalon } from '../../helpers/ninos.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public userEditing: User | undefined;
  public usersSearch: User[] = [];
  public isLoading: boolean = false;
  public display: boolean = false;

  formUpdateUser = this.fb.group({
    fullname: ['', Validators.required],
    points: [0, Validators.required],
    documento: [0, Validators.required]
  });

  constructor(
    private firebaseSrv: FirebaseService,
    private messageService: MessageService,
    private userSrv: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  async logout() {
    this.userSrv.logout();
    await this.router.navigateByUrl('/auth');
  }

  getSalon(user: User) {
    return getSalon(user);
  }

  getEdad(dob: string) {
    return getEdad(dob);
  }

  async searchUser(query: string, type: string) {    
    // TODO: Refactorizar
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
  editUser(user: User) {
    this.display = true;
    this.formUpdateUser.patchValue({
      fullname: user.fullname,
      points: user.points,
      documento: user.documento
    });
    this.userEditing = user;
  }

  cancelUpdate() {
    this.display = false;
    this.userEditing = undefined;
  }

  updateUser() {
    if(!this.userEditing) return;
    console.log(this.formUpdateUser.value);
  }
}
