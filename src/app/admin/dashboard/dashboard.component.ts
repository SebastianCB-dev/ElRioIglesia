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
    console.log('Cargando')
    if(query.length === 0) return;
    switch (type) {
      case 'ID':
        console.log('Searching ID');
        break;
      case 'Nombre':
        const usersByName = await this.firebaseSrv.getNinoByName(query);
        if (usersByName)
          this.usersSearch = usersByName as User[];
        break;
      case 'Identificacion':
        const usersByIdentificacion = await this.firebaseSrv.getNinoByDocument(query);
        if (usersByIdentificacion)
          this.usersSearch = usersByIdentificacion as User[];
        break;
    }
  }
}
