import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';

/**
 * Permission that user is authenticated.
 */
@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
