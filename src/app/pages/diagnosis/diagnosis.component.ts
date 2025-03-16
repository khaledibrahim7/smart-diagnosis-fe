import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
  imports: [ RouterModule, CommonModule, FormsModule]
})
export class DiagnosisComponent {
startDiagnosis() {
  throw new Error('Method not implemented.');
}
  message: string = "Welcome to the AI Diagnosis page!";
  messages: { text: string, isUser: boolean }[] = [];

  isPopupOpen = false;
  userMessage = '';
  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  sendMessage() {
    debugger
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, isUser: true });
      
      setTimeout(() => {
        this.messages.push({ text: "I'm here to help!", isUser: false });
      }, 1000);

      this.userMessage = ''; 
    }
  }
}