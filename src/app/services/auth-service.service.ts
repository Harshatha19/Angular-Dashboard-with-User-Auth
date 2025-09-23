import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) { }

  setToken(token: string) : void{
    localStorage.setItem('token', token)
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  //using observables to validate email and password
  login({email, password}:any): Observable<any>{
    if(email === 'admin@gmail.com' && password=== 'admin@123'){
this.setToken('abc');
return of({name: 'Harshatha', email: 'admin@gmail.com'});
    }
    return throwError(new Error('Failed to login'));
    
  }

}
