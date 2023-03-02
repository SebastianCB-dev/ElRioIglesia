import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | undefined;

  constructor(private fbSrv: FirebaseService) { }

  setUser(user: User) {
    this._user = user;
  }

  async loadUser() {
    if(this._user)
      return;
    const token = localStorage.getItem('token-rio') || '';
    if(token) {
      // TODO: Terminar
      await this.fbSrv.getUser(token)
    }
  }
}
