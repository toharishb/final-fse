import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('In intercept');
  
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${this.auth.getBearerToken()}`
      }
    })
  
  return next.handle(request);
  }

}
