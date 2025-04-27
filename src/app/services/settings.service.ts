import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl = 'http://localhost:2020/api/settings';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getSettings(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateSettings(patientId: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${patientId}`, payload, {
      headers: this.getAuthHeaders()
    });
  }

  deleteAccount(patientId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
