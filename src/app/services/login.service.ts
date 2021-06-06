import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Constants } from '../global/constants';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  //private currentUserSubject: BehaviorSubject<string>;
  //public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    //this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(sessionStorage.getItem('currentUser')));
    //this.currentUser = this.currentUserSubject.asObservable();
  }
   
  //   public get currentUserValue(): string {
  //   return this.currentUserSubject.value;
  // }

  login(username: string, password: string) {
    let userDetails: User = new User();
    userDetails.userName = username;
    userDetails.password = password;
    return this.http.post<any>(`${environment.apiUrl}`, userDetails, {
      'headers': Constants.headers
    })
      .pipe(map(response => {
        sessionStorage.setItem('currentUser', username);
        //this.currentUserSubject.next(username);
        let tokenStr= 'Bearer '+response.token;
        sessionStorage.setItem('token', tokenStr);
        return username;
      }),
        tap(_ => console.log(`Logged in user=${username}`)),
        catchError(this.handleError<String>('login failed'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      throw new Error('Login Failed! Please try again');
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout() {
    sessionStorage.clear();
    //this.currentUserSubject.next(null);
  }
}

