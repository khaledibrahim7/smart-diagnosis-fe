import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:2020/api/auth'; 

  constructor(private http: HttpClient) {}

  // تسجيل الدخول
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

  // التسجيل
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

  // إرسال كود إعادة تعيين كلمة السر
  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, data).pipe(
      catchError(this.handleError)
    );
  }

  // التحقق من رمز إعادة تعيين كلمة السر
  verifyResetCode(data: { email: string, token: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-reset-code`, data).pipe(
      catchError(this.handleError)
    );
  }

  // إعادة تعيين كلمة السر
  resetPassword(data: { token: string, newPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, data).pipe(
      catchError(this.handleError)
    );
  }

  // دالة لتخزين البيانات في الـ localStorage
  private storeUserData(token: string, id: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id }));
    console.log('✅ Token and Patient ID stored:', token, id);
  }

  // دالة لمعالجة الأخطاء
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error) {
      errorMessage = error.error.message || errorMessage;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
