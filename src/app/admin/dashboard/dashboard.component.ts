import { Component } from '@angular/core';
import { User } from '../../interface/user';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  usersSearch: User[] = [];

  constructor(
    private firebaseSrv: FirebaseService
  ) { }

  logout() {

  }

  async searchUser(query: string, type: string) {
    if(query.length === 0) return;
    switch (type) {
      case 'ID':
        console.log('Searching ID');
        break;
      case 'Nombre':
        const data = await this.firebaseSrv.getNinoByName(query);
        console.log(data);
        break;
      case 'Identificacion':
        console.log('Searching Identificación');
        break;
    }
  }
}
