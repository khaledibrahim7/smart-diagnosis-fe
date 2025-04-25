// chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:2020/api/chat';  // البورت بتاعك

  constructor(private http: HttpClient) { }

  startNewSession(firstMessage: string): Observable<any> {
    const token = localStorage.getItem('authToken');  // جلب التوكن من localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/start`, { firstMessage }, { headers });
  }

  getPatientSessions(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/sessions`, { headers });
  }

  saveBotResponse(sessionId: number, responseMessage: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-bot-response/${sessionId}`, responseMessage);
  }

  endSession(sessionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${sessionId}`);
  }
}
