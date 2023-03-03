import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { User } from 'src/app/interface/user';
import { FirebaseService } from '../../../services/firebase.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isLoading: boolean = false;
  public loginForm: FormGroup = this.fb.group({
    "documento": ['', [Validators.required, Validators.min(0)]],
    "id": ['', [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder,
              private fbSrv: FirebaseService,
              private messageService: MessageService,
              private router: Router,
              private userSrv: UserService) {}

  isValidControl(control: string) {
    return this.loginForm.get(control)?.touched &&
      this.loginForm.get(control)?.invalid;
  }


  async login() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    try {
      const documento = this.loginForm.get('documento')?.value.toString();
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
      if (user['id'] !== this.loginForm.get('id')?.value && user['role'] !== 'nino') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usuario y/o id incorrectos.'
        });
        return;
      }

      localStorage.setItem('token-rio', JSON.stringify(user['id']));
      this.userSrv.setUser(user as User);
      this.router.navigateByUrl('/ninos/profile')
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
