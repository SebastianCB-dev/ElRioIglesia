import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    "email": ['test1@gmail.com', [Validators.required, Validators.email]],
    "documento": ['1', [Validators.required, Validators.min(1)]],
    "fullname_nino": ['test1', [Validators.required]],
    "fullname_acudiente": ['test1', [Validators.required]],
    "dob": ['2001-11-11', [Validators.required]],
    "terms": [true, [Validators.requiredTrue]]
  },
  {
    validators: this.checkDate()
  });

  constructor(private fb: FormBuilder,
              private fbSrv: FirebaseService) {}

  isValidControl(control: string) {
    return this.registerForm.get(control)?.touched &&
           this.registerForm.get(control)?.invalid;
  }

  async register() {    
    if(this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }
    // TODO: Validate if user exists with document
    const user = await this.fbSrv.getUser('1');
    if(user) {
      // TODO: Show error message
      console.log('Ya existe');
      return;
    }
    await this.fbSrv.createUser({
      ...this.registerForm.value,
      points: 0
    }, 'nino').then(() => {
      console.log('Usuario creado');
    }).catch((err) => {
      console.log('Error:', err);
    }).finally(() => {
      console.log('Finalizado');
    });
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
