// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  // جلب الرسائل الخاصة بجلسة معينة
  getMessages(sessionId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`/api/chat/messages/${sessionId}`);
  }

  // إرسال رسالة من الـ Bot
  saveBotResponse(sessionId: number, responseMessage: string): Observable<any> {
    return this.http.post(`/api/chat/save-bot-response/${sessionId}`, responseMessage);
  }
}
