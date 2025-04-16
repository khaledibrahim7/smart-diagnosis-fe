import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl = 'http://localhost:2020/api/settings';

  constructor(private http: HttpClient) {}

  getSettings(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${patientId}`);
  }

  updateSettings(patientId: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${patientId}`, payload);
  }

  deleteAccount(patientId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${patientId}`);
  }
}
