import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = request;
        const token = sessionStorage.getItem('token');
        if (token!=null) {
            authReq = request.clone({ headers: request.headers.set('Authorization', token) });
        }
        return next.handle(authReq);
    }
}