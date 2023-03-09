import { Injectable } from '@angular/core';
import { User } from '../interface/user';

import * as CryptoJS from 'crypto-js';

import { FirebaseService } from './firebase.service';
import { PRIVATE_KEY } from '../constants/constants.example';


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
    const dataToken = localStorage.getItem('token-rio') || '';
    const token = this.decryptData(dataToken);
    if(token) {
      const user = await this.fbSrv.getUserByID(Number(token));
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

  cryptData(data: string) {
    return CryptoJS.AES.encrypt(data, PRIVATE_KEY).toString();
  }

  decryptData(data: string) {
    return CryptoJS.AES.decrypt(data, PRIVATE_KEY).toString(CryptoJS.enc.Utf8);
  }
}
