import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    "email": ['', [Validators.required]],
    "password": ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  isValidControl(control: string) {
    return this.loginForm.get(control)?.touched &&
      this.loginForm.get(control)?.invalid;
  }
}
