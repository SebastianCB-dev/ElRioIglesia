import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    "documento": ['', [Validators.required, Validators.min(0)]],
    "id": ['', [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder,
              private fbSrv: FirebaseService,
              private messageService: MessageService) {}

  isValidControl(control: string) {
    return this.loginForm.get(control)?.touched &&
      this.loginForm.get(control)?.invalid;
  }


  async login() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const documento = this.loginForm.get('documento')?.value.toString();
    const user = await this.fbSrv.getUser(documento);
    // Validate if user exists
    if(!user) {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Usuario y/o id incorrectos.'});
      return;
    }
    // Validate if id is correct
    if(user['user']['id'] !== this.loginForm.get('id')?.value) {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Usuario y/o id incorrectos.'});
      return;
    }

    localStorage.setItem('token-rio', JSON.stringify(user['user']['id']));
    // TODO: Redirect to dashboard
    
  }
}
