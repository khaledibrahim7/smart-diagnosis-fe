import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiagnosisService } from '../../services/DiagnosisService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DiagnosisComponent implements OnInit {
  activeChatId: number | null = null;
  messages: { text: string, isUser: boolean }[] = [];
  openedMenuIndex: number | null = null;
  chatHistory: { chatId: number, title: string, messages: { text: string, isUser: boolean }[] }[] = [];
  isPopupOpen = false;
  userMessage = '';
  recognition: any;
  userLang: string = 'en';
  isListening = false;
  isDarkMode = false;
  isLoading = false;
  isTyping = false;


  constructor(private diagnosisService: DiagnosisService, private router: Router, private http: HttpClient,  private snackBar: MatSnackBar
  ) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.setLanguage('en');
    this.setupRecognition();
  }

  ngOnInit() {
    if (this.isBrowser()) {
      this.updateLoginState();
      this.loadChatHistory(Number(localStorage.getItem('patientId')));
    }
    this.loadTheme();
  }

  goToAskDoctor() {
  this.router.navigate(['/doctor']);
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
    if (!token) this.router.navigate(['/login']);
  }

  setLanguage(lang: string) {
    this.userLang = lang;
    this.recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.stopListening();
  }

  private saveCurrentChat() {
    if (this.activeChatId !== null) {
      const chat = this.chatHistory.find(c => c.chatId === this.activeChatId);
      if (chat) {
        chat.messages = [...this.messages];
      }
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
            this.addBotMessage('');
          } else {
            
                this.addBotMessage(localText);
                this.saveBotMessageToBackend(localText); 
              }
            }
                    

        const formattedGeminiLines = this.formatGeminiResponse(geminiText);
        formattedGeminiLines.forEach(line => {
          this.addBotMessage(line);
            this.saveBotMessageToBackend(line);  
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
      .map(line => ` ${line}`);
  }
  private saveBotMessageToBackend(text: string) {
    if (this.activeChatId !== null) {
      this.diagnosisService.addMessage(this.activeChatId, false, text).subscribe({
        next: () => {},
        error: (err) => console.error('❌ خطأ في حفظ رد البوت', err)
      });
    }
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

  loadChat(chatId: number) {
    this.diagnosisService.getChatMessages(chatId).subscribe({
      next: (res) => {
        this.activeChatId = chatId;
        this.messages = res.data.map(msg => ({
          text: msg.content,
          isUser: msg.fromPatient
        }));
      },
      error: (err) => console.error('Error loading chat', err)
    });
  }

  loadChatHistory(patientId: number) {
    this.diagnosisService.getAllChats(patientId).subscribe({
      next: (res) => {
        this.chatHistory = res.data.map(chat => ({
          chatId: chat.id,
          title: chat.title,
          messages: []
        }));
      },
      error: (err) => console.error('Error loading chat history', err)
    });
  }

sendMessage(content?: string) {
  const text = content || this.userMessage.trim();
  if (!text) return;

  this.messages.push({ text, isUser: true });
  this.userMessage = '';
  this.isTyping = true;

  if (!this.activeChatId) {
    this.startNewChat(text);
    return;
  }

  if (this.activeChatId !== null) {
    this.diagnosisService.addMessage(this.activeChatId, true, text).subscribe({
      next: (messageResponse) => {
        const chat = this.chatHistory.find(chat => chat.chatId === this.activeChatId);
        if (chat && messageResponse.data) {
          chat.title = messageResponse.data.content;  
        }

        this.isTyping = false;
        this.sendTextToBot(text); 
      },
      error: (err) => {
        console.error('Error sending message', err);
        this.isTyping = false;
      }
    });
  } else {
    console.error('❌ لا يمكن إرسال الرسالة، معرّف المحادثة غير موجود');
  }
}

  
 startNewChat(initialMessage: string) {
  const currentChat = this.chatHistory.find(chat => chat.chatId === this.activeChatId);

  if (currentChat && currentChat.messages.length === 0) {
    alert('لا يمكن إنشاء شات جديد قبل إرسال رسالة واحدة على الأقل في الشات الحالي.');
    return;
  }

  const patientId = Number(localStorage.getItem('patientId'));

  this.diagnosisService.createNewChat(patientId, '').subscribe({
    next: (res) => {
      this.activeChatId = res.data.id;

      this.chatHistory.push({
        chatId: res.data.id,
        title: res.data.title, 
        messages: []
      });

      this.loadChat(res.data.id);

      this.sendMessage(initialMessage);
    },
    error: (err) => console.error('Error creating chat', err)
  });
}

  deleteChat(chatId: number) {
    const patientId = localStorage.getItem('patientId'); 
    if (!patientId) {
      console.error("❌ لم يتم العثور على معرّف المريض");
      return;
    }
  
    this.diagnosisService.deleteChat(chatId, Number(patientId)).subscribe({
      next: () => {
        this.chatHistory = this.chatHistory.filter(chat => chat.chatId !== chatId);
        if (this.activeChatId === chatId) {
          this.activeChatId = null;
          this.messages = [];
        }
      },
      error: (err) => console.error('❌ خطأ أثناء حذف المحادثة', err)
    });
  }
  

  shareChat(chat: any) {
    const chatText = `Chat Title: ${chat.title}`;
    navigator.share
      ? navigator.share({ title: chat.title, text: chatText })
      : alert(this.userLang === 'ar' ? 'المشاركة غير مدعومة في هذا المتصفح.' : 'Sharing not supported.');
    this.openedMenuIndex = null;
  }
toggleOptionsMenu(index: number) {
  if (this.openedMenuIndex === index) {
    this.openedMenuIndex = null;
  } else {
    this.openedMenuIndex = index;
  }
}

onMenuItemClick() {
  this.openedMenuIndex = null;
}  

}
