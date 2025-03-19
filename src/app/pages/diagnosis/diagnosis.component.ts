import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule]
})
export class DiagnosisComponent {
  messages: { text: string, isUser: boolean }[] = [];
  isPopupOpen = false;
  userMessage = '';
  recognition: any;  
  userLang: string = 'en';
  isListening = false; 

  constructor() {
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

      setTimeout(() => {
        this.messages.push({ 
          text: this.userLang === 'ar' ? "أنا هنا لمساعدتك!" : "I'm here to help!", 
          isUser: false 
        });
      }, 1000);

      this.userMessage = ''; 
    }
  }

  startListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.recognition.start();
      this.isListening = true;
    }
  }

  stopListening() {
    this.recognition.stop();
    this.isListening = false;
  }
}
