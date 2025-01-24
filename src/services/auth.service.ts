import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<any>(null);
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

  private setHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers =  headers.set('Content-Type', 'application/json');
    return headers;
  }

  login(data: any) : Observable<any>{
    return this.http.post("http://localhost:8000/api/login",data, {headers: this.headers})
    .pipe(tap((res:any) => {
      if(res.status){
        this.user.next(res.user);
        // localStorage.setItem('user', JSON.stringify(res.user));
      }
    }))
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  getUserFromLocalStorage(){
    return localStorage.getItem('user');
  }

  logout(): void {
    // localStorage.clear();
    this.router.navigate(['/login']);
  }



}
