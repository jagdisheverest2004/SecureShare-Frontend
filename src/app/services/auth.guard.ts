import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const username = localStorage.getItem('username'); //frontend username
    const otpVerified = localStorage.getItem('otpVerified'); // OTP step

    if (username && otpVerified === 'true') {
      return true;
    }

    // ❌ not logged in or OTP not verified → go to login
    return this.router.parseUrl('/');
  }
}
