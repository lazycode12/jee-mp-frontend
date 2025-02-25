import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private user = new BehaviorSubject<any>(null);
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

  private setHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers =  headers.set('Content-Type', 'application/json');
    return headers;
  }

  // const headers = new HttpHeaders(data ? {
  //   authorization : 'Basic ' + btoa(data.username + ':' + data.password)
  // } : {});

  // login(data: any) : Observable<any>{
  //   return this.http.post("http://localhost:8080/api/auth/login", data, {headers: this.headers})
  // }

  login(credentials: any) {
    return this.http.post<any>('http://localhost:8080/api/auth/login', credentials).pipe(
      tap(response => {
        // Store the JWT token
        localStorage.setItem('accestoken', response.accestoken);
      })
    );
  }

  getToken(key:string): string | null {
    return localStorage.getItem(key);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken('accestoken');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAuthenticatedUser(): void {
    this.http.get("http://localhost:8080/api/auth/user", { headers: this.getAuthHeaders() }).subscribe({
      next: (user:any )=> {
        localStorage.setItem('role', user.authorities[0].authority);
        switch (this.getToken('role')) {
          case 'ROLE_ADMIN_SP':
            this.router.navigate(['/gestion-sp']);
            break;
          case 'ROLE_ADMIN_USER':
            this.router.navigate(['/gestion-enseignants']);
            break;
          case 'ROLE_ADMIN_NOTES':
            this.router.navigate(['/gestion-notes']);
            break;
        }
      }
    })
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }



}
