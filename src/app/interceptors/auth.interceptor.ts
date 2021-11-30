import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.cookieService.get("jwt");
  
    let newRequest: HttpRequest<any>;
    newRequest = request.clone({
      headers: request.headers.set("Authorization","Bearer " + token).set("id",this.cookieService.get("uid")).set("securityKey",this.cookieService.get("sk")),
    })

    return next.handle(newRequest);
  }
}
