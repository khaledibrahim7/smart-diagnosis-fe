import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatSessionDTO {
  id: number;
  title: string;
  createdAt: string;
}

interface MessageDTO {
  id: number;
  content: string;
  fromPatient: boolean;
  timestamp: string;
}

interface ResponseWrapper<T> {
  data: T;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DiagnosisService {
  private apiUrl = 'http://localhost:2020/api/chat';

  constructor(private http: HttpClient) {}

  getAllChats(patientId: number): Observable<ResponseWrapper<ChatSessionDTO[]>> {
    const params = new HttpParams().set('patientId', patientId.toString());
    return this.http.get<ResponseWrapper<ChatSessionDTO[]>>(this.apiUrl, { params });
  }

  createNewChat(patientId: number, title: string): Observable<ResponseWrapper<ChatSessionDTO>> {
    const params = new HttpParams()
      .set('patientId', patientId.toString())
      .set('title', title);
    return this.http.post<ResponseWrapper<ChatSessionDTO>>(this.apiUrl, params);
  }

  getChatMessages(chatId: number): Observable<ResponseWrapper<MessageDTO[]>> {
    return this.http.get<ResponseWrapper<MessageDTO[]>>(`${this.apiUrl}/${chatId}`);
  }

  addMessage(chatId: number, fromPatient: boolean, content: string): Observable<ResponseWrapper<MessageDTO>> {
    const params = new HttpParams()
      .set('fromPatient', fromPatient.toString())
      .set('content', content);
    return this.http.post<ResponseWrapper<MessageDTO>>(`${this.apiUrl}/${chatId}/messages`, params);
  }

  deleteChat(chatId: number, patientId: number): Observable<void> {
    const params = new HttpParams().set('patientId', patientId.toString());
    return this.http.delete<void>(`${this.apiUrl}/${chatId}`, { params });
  }
}