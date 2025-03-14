import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root' // Automatically provides this service
})
export class AuthService {
  private apiUrl = 'http://localhost:2020/api/auth'; // Change this to your backend URL

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  signUp(userModel: UserModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userModel );
  }


}
