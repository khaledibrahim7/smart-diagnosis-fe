import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DiagnosisComponent implements OnInit {
  messages: { text: string, isUser: boolean }[] = [];
  isPopupOpen = false;
  userMessage = '';
  recognition: any;
  userLang: string = 'en';
  isListening = false;
  isDarkMode = false; // إضافة خاصية الوضع الداكن

  constructor(private router: Router, private http: HttpClient) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.setLanguage('en');
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      this.messages.push({ text: speechResult, isUser: true });

      setTimeout(() => {
        this.messages.push({
          text: this.userLang === 'ar' ? "أنا هنا لمساعدتك!" : "I'm here to help!",
          isUser: false
        });
      }, 1000);
    };

    this.recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  ngOnInit() {
    if (this.isBrowser()) {
      this.updateLoginState();
    }
    this.loadTheme();
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  updateLoginState() {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
      }
    }
  }

  setLanguage(lang: string) {
    this.userLang = lang;
    this.recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
  }

  openPopup(startMic: boolean = false) {
    this.isPopupOpen = true;
    if (startMic) {
      this.startListening();
    }
  }

  closePopup() {
    this.isPopupOpen = false;
    this.stopListening();
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, isUser: true });
      this.getDiagnosisResponse(this.userMessage);
      this.userMessage = '';  
    }
  }

  getDiagnosisResponse(question: string) {
    this.http.post('http://localhost:2020/api/diagnosis', { question })
      .subscribe(
        (response: any) => {
          this.messages.push({
            text: response.text,  
            isUser: false
          });
        },
        (error) => {
          console.error('خطأ في التواصل مع API:', error);
        }
      );
  }

  toggleListening() {
    this.isListening ? this.stopListening() : this.startListening();
  }

  startListening() {
    if (this.isListening) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        this.recognition.start();
        this.isListening = true;
      })
      .catch((err) => {
        console.error('❌ فشل في الحصول على إذن الميكروفون:', err);
      });
  }

  stopListening() {
    this.recognition.stop();
    this.isListening = false;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
  }

  loadTheme() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = darkMode;
    if (darkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token'); 
    }
    this.router.navigate(['/login']); 
  }
}
