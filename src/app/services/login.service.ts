import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthRequest, AuthResponse } from '../models/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = environment.API_URL_TEST

  constructor( private http: HttpClient, private cookie: CookieService) {}

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, requestDatas)
  }

  logOutUser(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/logout`, {})
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO')
    return JWT_TOKEN ? true : false
  }

}
