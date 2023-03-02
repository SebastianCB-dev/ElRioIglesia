import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { MessageService } from 'primeng/api';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public isLoading: boolean = false;
  public registerForm: FormGroup = this.fb.group({
    "email": ['test1@gmail.com', [Validators.required, Validators.email]],
    "documento": ['1', [Validators.required, Validators.min(1)]],
    "fullname": ['test1', [Validators.required]],
    "fullname_acudiente": ['test1', [Validators.required]],
    "dob": ['1111-11-11', [Validators.required]],
    "terms": [true, [Validators.requiredTrue]]
  },
  {
    validators: this.checkDate()
  });

  constructor(private fb: FormBuilder,
              private fbSrv: FirebaseService,
              private messageService: MessageService) {}

  isValidControl(control: string) {
    return this.registerForm.get(control)?.touched &&
           this.registerForm.get(control)?.invalid;
  }

  async register() {        
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    try {
      this.isLoading = true;
      const documento = this.registerForm.get('documento')?.value.toString();
      const user = await this.fbSrv.getUser(documento);
      // Validate if user exists
      if (user) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: 'Ya existe un niño(a) con esa identificación.'
        });
        return;
      }
      const id = await this.fbSrv.getMaxId();
      this.registerForm.value.id = id;
      this.registerForm.value.points = 0;
      const { terms, ...data} = this.registerForm.value;
      data.dob = new Date(data.dob);
      // Create user
      await this.fbSrv.createUser({
        ...data
      }, 'nino')
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro completado',
            detail: 'Su usuario fue creado exitosamente.'
          });
          // Show ID Sweet Alert
          Swal.fire(
            'Registro satisfactorio',
            `El id de su niño(a) es: <strong>${id}</strong> <br> Por favor guardelo para futuras consultas.`,
            'info'
          )
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
    finally {
      this.isLoading = false;
    }
    
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
