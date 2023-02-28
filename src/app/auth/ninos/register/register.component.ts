import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    "email": ['', [Validators.required, Validators.email]],
    "documento": ['', [Validators.required, Validators.min(1)]],
    "fullname": ['', [Validators.required]],
    "fullname_acudiente": ['', [Validators.required]],
    "dob": ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  isValidControl(control: string) {
    return this.registerForm.get(control)?.touched &&
           this.registerForm.get(control)?.invalid;
  }

  register() {

  }
}
