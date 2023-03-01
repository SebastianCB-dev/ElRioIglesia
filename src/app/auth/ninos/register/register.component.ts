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
    "fullname_nino": ['', [Validators.required]],
    "fullname_acudiente": ['', [Validators.required]],
    "dob": ['', [Validators.required]],
    "terms": [false, [Validators.requiredTrue]]
  },
  {
    validators: this.checkDate()
  });

  constructor(private fb: FormBuilder) {}

  isValidControl(control: string) {
    return this.registerForm.get(control)?.touched &&
           this.registerForm.get(control)?.invalid;
  }

  register() {    
    if(this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }
    console.log('Registering');
  }

  getDateToday() {
    return new Date().toISOString().split('T')[0];
  }

  checkDate() {
    return (formGroup: FormGroup) => {
      if(formGroup.get('dob')?.value > this.getDateToday()) {
        formGroup.get('dob')?.setErrors({invalidDate: true});
      }
      return null;
    }
  }
}
