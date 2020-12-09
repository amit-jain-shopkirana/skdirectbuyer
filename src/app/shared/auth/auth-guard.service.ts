import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LocalStogareService } from '../services/local-stogare.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, public router: Router,public localStogareService: LocalStogareService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('state.url', state.url);

    if (!this.authService.isAuthenticated()) {
      this.localStogareService.set(this.localStogareService.redirectUrlKey, state.url);
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
