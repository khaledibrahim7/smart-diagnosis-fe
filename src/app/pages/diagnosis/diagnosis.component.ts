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
  openedMenuIndex: number | null = null;
  messages: { text: string, isUser: boolean }[] = [];
  chatHistory: { id: number, title: string, messages: { text: string, isUser: boolean }[] }[] = [];
  activeChatId: number | null = null;

  isPopupOpen = false;
  userMessage = '';
  recognition: any;
  userLang: string = 'en';
  isListening = false;
  isDarkMode = false;
  isLoading = false;
  isTyping = false;
  nextChatId = 1;

  constructor(private router: Router, private http: HttpClient) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.setLanguage('en');
    this.setupRecognition();
  }

  ngOnInit() {
    if (this.isBrowser()) {
      this.updateLoginState();
    }
    this.loadTheme();
    this.getPatientSessions(); 
  }

  private setupRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      this.addUserMessage(speechResult);
      this.sendTextToBot(speechResult);
    };

    this.recognition.onerror = (event: any) => {
      console.error("❌ Speech recognition error:", event);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private updateLoginState() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
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
    if (this.activeChatId === null) {
      this.startNewSession();  // Start a new session
    }
  }

  closePopup() {
    this.isPopupOpen = false;
    this.stopListening();
  }

  private saveCurrentChat() {
    if (this.activeChatId !== null) {
      const chat = this.chatHistory.find(c => c.id === this.activeChatId);
      if (chat) {
        chat.messages = [...this.messages];
      }
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.addUserMessage(this.userMessage);
      this.sendTextToBot(this.userMessage);
      this.userMessage = '';
    }
  }

  private addUserMessage(message: string) {
    this.messages.push({ text: message, isUser: true });
    this.saveCurrentChat();
  }

  private addBotMessage(message: string) {
    this.messages.push({ text: message, isUser: false });
    this.saveCurrentChat();
  }

  private addTypingIndicator() {
    const typingText = this.userLang === 'ar' ? 'جاري الكتابة...' : 'Typing...';
    this.isTyping = true;
    this.messages.push({ text: typingText, isUser: false });
  }

  private removeTypingIndicator() {
    const typingText = this.userLang === 'ar' ? 'جاري الكتابة...' : 'Typing...';
    this.messages = this.messages.filter(msg => msg.text !== typingText);
    this.isTyping = false;
  }

  sendTextToBot(message: string) {
    this.isLoading = true;
    this.addTypingIndicator();

    const localModelApi = this.http.post('http://localhost:9000/chat', { message }).toPromise();
    const geminiApi = this.http.post('http://localhost:5000/chat', { message }).toPromise();

    Promise.all([localModelApi, geminiApi])
      .then(([localResponse, geminiResponse]: [any, any]) => {
        const localText = localResponse?.response || null;
        const geminiText = geminiResponse?.response || '🤖 سمارت: لا يوجد رد.';

        this.removeTypingIndicator();

        const unwantedKeywords = [
          "مرحباً",
          "أهلاً بيك! أنا هنا علشان أساعدك تطمن على صحتك، قولي حاسس بإيه؟",
          "  أهلاً وسهلاً! قولي بقى، عاوز تطمن على صحتك؟",
          "منورنا والله! قولي مالك كده شكلك مش رايق؟",
          "منورنا والله! قولي مالك كده وشك مش رايق؟",
          "Munawarna by God! Say that your money is like this and not?"
        ];

        if (localText) {
          if (unwantedKeywords.some(keyword => localText.includes(keyword))) {
            this.addBotMessage('👇🏼');
          } else {
            this.addBotMessage(localText);
          }
        }

        const formattedGeminiLines = this.formatGeminiResponse(geminiText);
        formattedGeminiLines.forEach(line => {
          this.addBotMessage(line);
        });
      })
      .catch((error) => {
        console.error('❌ Error communicating with APIs:', error);
        this.removeTypingIndicator();
        const errorText = this.userLang === 'ar'
          ? 'حدث خطأ أثناء التواصل مع الخوادم.'
          : 'An error occurred while communicating with servers.';
        this.addBotMessage(errorText);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  formatGeminiResponse(text: string): string[] {
    const lines = text.split(/\n|\. /);
    return lines
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `🔹 ${line}`);
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
    if (this.recognition) {
      this.recognition.stop();
    }
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

  toggleOptionsMenu(chatId: number) {
    if (this.openedMenuIndex === chatId) {
      this.openedMenuIndex = null;
    } else {
      this.openedMenuIndex = chatId;
    }
  }

  loadChat(chatId: number) {
    const chat = this.chatHistory.find(c => c.id === chatId);
    if (chat) {
      this.activeChatId = chatId;
      this.messages = [...chat.messages]; 
      console.log("✅ Chat loaded:", chat);
    }
  }

  

  private newChat() {
    const newChat = {
      id: this.nextChatId++,
      title: `${this.userLang === 'ar' ? 'محادثة' : 'Chat'} #${this.nextChatId - 1}`,
      messages: []
    };
    this.chatHistory.push(newChat);
    this.activeChatId = newChat.id;
    this.messages = [];
  }

  startNewChat() {
    this.newChat(); 
  }

  startNewSession() {
    this.http.post('http://localhost:2020/api/chat/start', {}, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(response => {
      console.log("✅ New chat session started");
      this.newChat();
    }, error => {
      console.error("❌ Error starting chat session:", error);
    });
  }

  getPatientSessions() {
    this.http.get('http://localhost:2020/api/chat/sessions', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe((response: any) => {
      console.log("✅ Patient sessions loaded", response);
      this.chatHistory = response;
    }, error => {
      console.error("❌ Error fetching sessions:", error);
    });
  }

  saveBotResponse(sessionId: number, responseMessage: string) {
    this.http.post(`http://localhost:2020/api/chat/save-bot-response/${sessionId}`, responseMessage, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(response => {
      console.log("✅ Bot response saved");
    }, error => {
      console.error("❌ Error saving bot response:", error);
    });
  }

  deleteChat(chatId: number) {
    // الأول نحذف من الباك إند
    this.http.delete(`http://localhost:2020/api/chat/${chatId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe({
      next: (response: any) => {
        console.log("✅ Chat session ended successfully, response:", response);
  
        // لو الحذف نجح، نحذف من الفرونت إند
        const chatIndex = this.chatHistory.findIndex(chat => chat.id === chatId);
        if (chatIndex !== -1) {
          this.chatHistory.splice(chatIndex, 1);
          if (this.activeChatId === chatId) {
            this.activeChatId = null;
          }
          console.log("✅ Chat deleted from frontend");
        }
      },
      error: (error) => {
        console.error("❌ Error ending chat session:", error);
      }
    });
  }
  

  shareChat(chat: any) {
    const chatText = `Chat Title: ${chat.title}`;
    navigator.share
      ? navigator.share({ title: chat.title, text: chatText })
      : alert(this.userLang === 'ar' ? 'المشاركة غير مدعومة في هذا المتصفح.' : 'Sharing not supported.');
    this.openedMenuIndex = null;
  }
}
