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

  logout() {
    this.userSrv.logout();
    this.router.navigateByUrl('/auth/ninos/login');
  }
}
