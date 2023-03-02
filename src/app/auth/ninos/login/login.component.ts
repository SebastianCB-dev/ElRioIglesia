import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
              private fbSrv: FirebaseService
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
    const documento = this.loginForm.get('documento')?.value;
    const user = await this.fbSrv.getUser(documento);
    if(!user) {

    }
  }
}
