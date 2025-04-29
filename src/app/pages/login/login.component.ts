import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.error("❌ Please fill in all required fields correctly.");
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log("✅ Login successful!", response);

        if (response.token && response.id) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('patientId', response.id);
          console.log("🔵 Token and Patient ID stored:", response.token, response.id);

          this.successMessage = 'تم تسجيل الدخول بنجاح!';
          this.errorMessage = null;

          this.speakGreeting();

          this.router.navigate(['/diagnosis']);
        } else {
          console.warn("⚠️ Response missing token or ID:", response);
          this.errorMessage = 'حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى.';
          this.successMessage = null;
        }
      },
      error: (error) => {
        console.error("❌ Login failed!", error);
        this.errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.';
        this.successMessage = null;
      }
    });
  }

  speakGreeting(): void {
    const message = "Welcome back to our platform! أهلاً بك تاني في منصتنا!";

    const utteranceArabic = new SpeechSynthesisUtterance("أهلاً بك تاني في منصتنا!");
    utteranceArabic.lang = 'ar-EG';
    speechSynthesis.speak(utteranceArabic);

    const utteranceEnglish = new SpeechSynthesisUtterance("Welcome back to our platform!");
    utteranceEnglish.lang = 'en-US';
    speechSynthesis.speak(utteranceEnglish);

    
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
