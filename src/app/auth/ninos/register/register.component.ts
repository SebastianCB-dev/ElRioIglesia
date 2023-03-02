import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../../../services/firebase.service';

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

  constructor(private fb: FormBuilder,
              private fbSrv: FirebaseService,
              private messageService: MessageService) {
    
              }

  isValidControl(control: string) {
    return this.registerForm.get(control)?.touched &&
           this.registerForm.get(control)?.invalid;
  }

  async register() {        
    if(this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }
    const id = this.registerForm.get('documento')?.value;
    const user = await this.fbSrv.getUser(id);
    // Validate if user exists
    if(user) {      
      this.messageService.add({ 
         severity: 'error',
         summary: 'Error en el registro', 
         detail: 'Ya existe un niño(a) con esa identificación.' });
      return;
    }
    // Create user
    await this.fbSrv.createUser({
      ...this.registerForm.value,
      points: 0
    }, 'nino')
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro completado',
          detail: 'Su usuario fue creado exitosamente.'
        });
        // Show ID Sweet Alert
        
        // Reset form
        this.registerForm.reset();
      }).catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: 'Contacte al administrador.'
        });
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
