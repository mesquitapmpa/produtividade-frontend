import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Injectable, Injector } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  // this.cookieService.set('USER_INFO', response?.token)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cookieService = this.injector.get(CookieService)

    const request = req.clone({
      setHeaders:{
      'Authorization': `Bearer ${cookieService.get('TOKEN')}`,
      'X-Token': `Bearer ${cookieService.get('X-Token')}`}
    })

    console.log('intercepting', request)
    return next.handle(request)
  }



}
