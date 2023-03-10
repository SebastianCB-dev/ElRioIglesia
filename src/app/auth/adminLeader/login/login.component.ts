import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/interface/user';
import { FirebaseService } from '../../../services/firebase.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginAdminLeaderComponent {

  public isLoading: boolean = false;
  public loginAdminLeader: FormGroup = this.fb.group({
    "documento": ['', [Validators.required, Validators.min(0)]],
    "id": ['', [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder,
    private fbSrv: FirebaseService,
    private messageService: MessageService,
    private router: Router,
    private userSrv: UserService) { }

  isValidControl(control: string) {
    return this.loginAdminLeader.get(control)?.touched &&
      this.loginAdminLeader.get(control)?.invalid;
  }


  async login() {
    if (this.loginAdminLeader.invalid) {
      this.loginAdminLeader.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    try {
      const documento = this.loginAdminLeader.get('documento')?.value.toString();
      const user = await this.fbSrv.getUser(documento);
      // Validate if user exists
      if (!user) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usuario y/o id incorrectos.'
        });
        return;
      }
      // Validate if id is correct
      if (user['id'] !== this.loginAdminLeader.get('id')?.value || user['role'] === 'nino') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usuario y/o id incorrectos.'
        });
        return;
      }
      const idCrypt = this.userSrv.cryptData(user['id'].toString());
      localStorage.setItem('token-rio', idCrypt);
      this.userSrv.setUser(user as User);
      if(user['role'] === 'admin') {
        this.router.navigateByUrl('/admin/dashboard');
      }      
    }
    catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ha ocurrido un error inesperado.'
      });
    }
    finally {
      this.isLoading = false;
    }


  }
}
