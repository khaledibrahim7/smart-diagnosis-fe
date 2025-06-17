import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxIntlTelInputModule, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage: string | null = null;

  separateDialCode = true;
  preferredCountries: string[] = ['us', 'gb', 'sa', 'eg'];
  phoneFormat = PhoneNumberFormat.International;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: new FormControl(null, [Validators.required]),
        age: [null, [Validators.required, Validators.min(18)]],
        gender: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordComplexityValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const errors: any = {};
    if (!/[A-Z]/.test(password)) errors.missingUpperCase = true;
    if (!/[a-z]/.test(password)) errors.missingLowerCase = true;
    if (!/\d/.test(password)) errors.missingNumber = true;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.missingSpecialChar = true;

    return Object.keys(errors).length ? errors : null;
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get phoneNumberControl() {
    return this.signupForm.get('phoneNumber');
  }

  isPhoneNumberValid(): boolean {
    const phoneControl = this.phoneNumberControl;
    return phoneControl?.valid ?? false;
  }

  clearErrorMessages(): void {
    this.errorMessage = null;
  }

  onSubmit(): void {
    if (this.signupForm.invalid || this.isSubmitting || !this.isPhoneNumberValid()) {
      this.signupForm.markAllAsTouched();
      this.snackBar.open('يرجى التأكد من ملء جميع الحقول بشكل صحيح قبل التسجيل.', 'إغلاق', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    const blockedUntil = localStorage.getItem('signupBlockedUntil');
    if (blockedUntil && new Date().getTime() < parseInt(blockedUntil)) {
      const remaining = Math.ceil((parseInt(blockedUntil) - new Date().getTime()) / 60000);
      this.snackBar.open(`لقد تجاوزت عدد المحاولات. حاول مرة أخرى بعد ${remaining} دقيقة.`, 'إغلاق', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    this.isSubmitting = true;
    this.signupForm.disable();

    const formData = this.signupForm.value;
    formData.phoneNumber = formData.phoneNumber ? formData.phoneNumber?.internationalNumber : '';

    this.authService.signUp(formData).subscribe({
      next: (response) => {
        console.log('✅ تم التسجيل بنجاح!', response);
        if (response.token && response.id) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('patientId', response.id.toString());
        }

        this.snackBar.open('تم التسجيل بنجاح!', 'إغلاق', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        localStorage.removeItem('signupAttempts');
        localStorage.removeItem('signupBlockedUntil');

        this.speakGreeting();
        this.router.navigate(['/diagnosis']);
      },
      error: (err) => {
        console.error('❌ فشل في التسجيل', err.error?.message || err);

        // زيادة عدد المحاولات
        let attempts = parseInt(localStorage.getItem('signupAttempts') || '0', 10);
        attempts++;
        localStorage.setItem('signupAttempts', attempts.toString());

        // تسجيل تفاصيل المحاولة الفاشلة
        const failedLogs = JSON.parse(localStorage.getItem('signupFailedLogs') || '[]');
        failedLogs.push({
          timestamp: new Date().toISOString(),
          email: formData.email,
          reason: err.error?.message || 'Unknown error'
        });
        localStorage.setItem('signupFailedLogs', JSON.stringify(failedLogs));

        if (attempts >= 3) {
          const blockTime = new Date().getTime() + 30 * 60 * 1000;
          localStorage.setItem('signupBlockedUntil', blockTime.toString());
          localStorage.removeItem('signupAttempts');

          this.snackBar.open('تم حظرك مؤقتًا بعد 3 محاولات فاشلة. حاول بعد 30 دقيقة.', 'إغلاق', {
            duration: 4000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('فشل التسجيل، حاول مرة أخرى.', 'إغلاق', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      },
      complete: () => {
        this.isSubmitting = false;
        this.signupForm.enable();
      },
    });
  }

  speakGreeting(): void {
    const message = " أهلاً بك في منصتنا!  Welcome to our platform!";
    const utteranceEnglish = new SpeechSynthesisUtterance("Welcome to our platform!");
    utteranceEnglish.lang = 'en-US';
    speechSynthesis.speak(utteranceEnglish);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
