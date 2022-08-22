import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userNameKey = 'MicroFocusUser';
  private userNameId = 'MicroFocusUserId';

  constructor(
    private router: Router
  ) {}

  login(name: string, userId: string): void {
    localStorage.setItem(this.userNameKey, name);
    localStorage.setItem(this.userNameId, userId);
    this.router.navigate(['/']);
  }

  getCurrentUserName(): string {
    if (localStorage.getItem(this.userNameKey) && localStorage.getItem(this.userNameKey) !== '') {
      return localStorage.getItem(this.userNameKey);
    }
  }

  getCurrentUsedNameId(): string {
    return localStorage.getItem(this.userNameId);
  }

  getWelcome(): string {
    if (this.isLoggedIn()) {
      return 'Welcome, ' + this.getCurrentUserName();
    } else {
      return 'You are not logged in';
    }
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem(this.userNameKey) && localStorage.getItem(this.userNameKey) !== '') {
      return true;
    } else {
      return false;
    }
  }

  logOut(): void {
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userNameId);
  }

}
