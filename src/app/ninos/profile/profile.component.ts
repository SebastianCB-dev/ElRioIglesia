import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User;

  constructor(private userSrv: UserService,
              private router: Router) {
    this.user = this.userSrv.getUser()!;
  }

  async logout() {
    this.userSrv.logout();
    await this.router.navigateByUrl('/auth/ninos/login');
  }

  getCourse() {
    const edad: number = this.getEdad(this.user.dob);
    console.log(edad)
    if (edad < 3) {
      return 'No aplicable';
    }
    if(edad >=3 && edad <= 4) {
      return 'Salon 3-4';
    }
    else if(edad >=5 && edad <= 6) {
      return 'Salon 5-6';
    }
    else if(edad >=7 && edad <= 8) {
      return 'Salon 7-8';
    }
    else if(edad >=9 && edad <= 10) {
      return 'Salon 9-10';
    }
    else if(edad >=11 && edad <= 13) {
      return 'Salon 11-13';
    }
    else {
      return 'No aplicable';
    }
  }
  getEdad(dateString: string) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }
}
