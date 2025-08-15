import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Injectable, Injector } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cookieService = this.injector.get(CookieService)
    //cookieService.set('REQUEST', "true")
    console.log('intercepting', req)

    const request = req.clone({
      setHeaders:{
        'Authorization': `Bearer ${cookieService.get('TOKEN')}`,
        'X-Token': `Bearer ${cookieService.get('X-Token')}`
      }
    })
    return next.handle(request)
  }



}
