import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private loginService: LoginService, private router: Router) {}


  canActivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.loginService.isLoggedIn()) {
        this.router.navigate(['/login'])
        return false
      }


      this.loginService.isLoggedIn()
      return true

  }
}
