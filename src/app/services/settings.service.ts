import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl = 'http://localhost:2020/api/settings';
    private apiUrl = 'https://libretranslate.de/translate';


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
  
 translate(text: string, target: string, source = 'auto') {
    const url = 'https://libretranslate.de/translate';

    return this.http.post<any>(url, {
      q: text,
      source: source,
      target: target,
      format: 'text'
    }).pipe(
      map(res => res.translatedText),
      catchError(error => {
        console.error('❌ Error during translation:', error);
        return of(text); // fallback: رجع نفس النص لو فشل
      })
    );
  }


}
