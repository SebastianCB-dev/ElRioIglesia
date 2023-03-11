import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interface/user';
import { UserService } from '../../services/user.service';

import { getEdad, getSalon } from '../../helpers/ninos.helper';

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

  getEdad(dob: string) {
    return getEdad(dob);
  }
  
  getCourse() {
    return getSalon(this.user);
  }

}
