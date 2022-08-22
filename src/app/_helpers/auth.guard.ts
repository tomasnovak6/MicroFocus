/**
 * This is the class that checks if the user who wants to enter the client area is logged in.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authenticationService.isLoggedIn()) {
      // return true if the user is authorized
      return true;
    } else {
      // if the user is not logged in, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
