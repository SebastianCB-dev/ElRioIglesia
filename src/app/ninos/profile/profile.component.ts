import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User;

  constructor(private userSrv: UserService) {
    this.user = this.userSrv.getUser()!;
  }
}
