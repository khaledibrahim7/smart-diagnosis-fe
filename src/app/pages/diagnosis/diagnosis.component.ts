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
  isDarkMode = false; 
  isLoading = false;

  constructor(private router: Router, private http: HttpClient) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.setLanguage('en');
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      this.messages.push({ text: speechResult, isUser: true });
      this.sendTextToBot(speechResult);
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
      this.sendTextToBot(this.userMessage);
      this.userMessage = '';  
    }
  }

  sendTextToBot(message: string) {
    this.isLoading = true;

    // ➡️ إضافة رسالة "جاري الكتابة..."
    const typingText = this.userLang === 'ar' ? 'جاري الكتابة...' : 'Typing...';
    this.messages.push({ text: typingText, isUser: false });

    const localModelApi = this.http.post('http://127.0.0.1:9000/chat', { message }).toPromise();
    const geminiApi = this.http.post('http://127.0.0.1:5000/chat', { message }).toPromise();

    Promise.all([localModelApi, geminiApi])
      .then(([localResponse, geminiResponse]: [any, any]) => {
        const localText = localResponse?.response || null;
        const geminiText = geminiResponse?.response || '🤖 سمارت: لا يوجد رد.';

        // ➡️ حذف رسالة "جاري الكتابة..." قبل إضافة الردود
        this.messages = this.messages.filter(msg => msg.text !== typingText);

        if (localText) {
          this.messages.push({
            text: localText,
            isUser: false
          });
        }

        this.messages.push({
          text: geminiText,
          isUser: false
        });
      })
      .catch((error) => {
        console.error('❌ Error communicating with APIs:', error);

        // ➡️ حذف رسالة "جاري الكتابة..." في حالة الخطأ
        this.messages = this.messages.filter(msg => msg.text !== typingText);

        this.messages.push({
          text: this.userLang === 'ar' ? 'حدث خطأ أثناء التواصل مع الخوادم.' : 'An error occurred while communicating with servers.',
          isUser: false
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
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
        console.error('❌ Microphone access failed:', err);
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
