import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DocumentData } from 'firebase/firestore';

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
    if(query.length === 0) return;
    this.isLoading = true;
    let user: DocumentData[] | null = null;

    if(type === 'ID' && !isNaN(parseInt(query))) {
      user = await this.firebaseSrv.getNinoByID(parseInt(query));
    }
    else if(type === 'Nombre') {
      user = await this.firebaseSrv.getNinoByName(query);
    }
    else if (type === 'Identificacion' && !isNaN(parseInt(query))) {
      user = await this.firebaseSrv.getNinoByDocument(parseInt(query));
    }
    if(user && user.length > 0) {
      this.usersSearch = user as User[];
      this.showMessageUsersLoaded();      
    }
    else {
      this.usersSearch = [];
      this.showMessageUsersNotFound();
    }
    this.isLoading = false;
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
