import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;  
  successMessage: string | null = null; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,  private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackBar.open('❌ يرجى ملء جميع الحقول بشكل صحيح.', 'إغلاق', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }
  
    const blockedUntil = localStorage.getItem('loginBlockedUntil');
    if (blockedUntil && new Date().getTime() < parseInt(blockedUntil)) {
      const remaining = Math.ceil((parseInt(blockedUntil) - new Date().getTime()) / 60000);
      this.snackBar.open(`🚫 لقد تجاوزت عدد المحاولات. حاول مرة أخرى بعد ${remaining} دقيقة.`, 'إغلاق', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response.token && response.id) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('patientId', response.id);
  
          localStorage.removeItem('loginAttempts');
          localStorage.removeItem('loginBlockedUntil');
  
          this.snackBar.open('✅ تم تسجيل الدخول بنجاح!', 'إغلاق', {
            duration: 2000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
  
          this.speakGreeting();
          this.router.navigate(['/diagnosis']);
        } else {
          this.snackBar.open('⚠️ حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى.', 'إغلاق', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
      error: (error) => {
        let attempts = parseInt(localStorage.getItem('loginAttempts') || '0', 10);
        attempts++;
        localStorage.setItem('loginAttempts', attempts.toString());
  
        if (attempts >= 3) {
          const blockTime = new Date().getTime() + 30 * 60 * 1000; 
          localStorage.setItem('loginBlockedUntil', blockTime.toString());
          localStorage.removeItem('loginAttempts');
  
          this.snackBar.open('🚫 تم حظرك مؤقتًا بعد 3 محاولات فاشلة. حاول بعد 30 دقيقة.', 'إغلاق', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('❌ البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.', 'إغلاق', {
            duration: 1000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
  
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  }
  
 speakGreeting(): void {
  const utteranceEnglish = new SpeechSynthesisUtterance("Welcome back to our platform!");
  utteranceEnglish.lang = 'en-US';

  const voices = speechSynthesis.getVoices();
  const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
  if (englishVoice) {
    utteranceEnglish.voice = englishVoice;
  }

  speechSynthesis.speak(utteranceEnglish);
}


  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
