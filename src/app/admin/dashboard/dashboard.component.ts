import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  logout() {

  }

  searchUser(query: string, type: string) {
    console.log({query, type});
  }
}
