import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userSrv: UserService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.userSrv.loadUser();
    if(!this.userSrv.getUser()) {
      return false;
    }
    return true;
  }

  async canLoad(route: Route, segments: UrlSegment[]) {
    await this.userSrv.loadUser();
    if (!this.userSrv.getUser()) {
      return false;
    }
    return true;
  }
}
