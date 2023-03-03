import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | undefined;

  constructor(private fbSrv: FirebaseService) {
    this.loadUser();
  }

  setUser(user: User) {
    this._user = user;
  }

  getUser() {
    return this._user;
  }

  async loadUser() {
    if(this._user)
      return;
    const token = localStorage.getItem('token-rio') || '';
    if(token) {      
      const user = await this.fbSrv.getUser(token);
      if(user) {
        this._user = user as User;
      }
    }
    return;
  }

  logout() {
    this._user = undefined;
    localStorage.removeItem('token-rio');
  }
}
