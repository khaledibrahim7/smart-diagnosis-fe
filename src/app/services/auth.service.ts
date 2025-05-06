import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router'; 
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:2020/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {} 

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, id: number }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          this.storeUserData(response.token, response.id);
        }
      }),
      catchError(this.handleError)
    );
  }

  signUp(userModel: UserModel): Observable<any> {
    return this.http.post<{ token: string, id: number }>(`${this.apiUrl}/register`, userModel).pipe(
      tap(response => {
        if (response.token) {
          this.storeUserData(response.token, response.id);
        }
      }),
      catchError(this.handleError)
    );
  }

  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, data).pipe(
      catchError(this.handleError)
    );
  }

  verifyResetCode(data: { email: string, token: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-reset-code`, data).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(data: { token: string, newPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, data).pipe(
      catchError(this.handleError)
    );
  }

  private storeUserData(token: string, id: number) {
    const expirationTime = Date.now() + 7200000; 
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id }));
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    console.log('✅ Token and Patient ID stored:', token, id);
  }

  isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) return true;
    return Date.now() >= parseInt(expirationTime);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');
    console.log('✅ User logged out due to token expiration');
    this.router.navigate(['/login']); 
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error) {
      errorMessage = error.error.message || errorMessage;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
