import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  feedbackTypes: string[] = ['مشكلة في التشخيص', 'اقتراح تحسين', 'استفسار طبي', 'مشكلة تقنية', 'أخرى'];

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.feedbackForm = this.fb.group({
      rating: [null, Validators.required],
      email: ['', Validators.email], 
      feedbackType: ['', Validators.required],
      feedbackText: ['', [Validators.minLength(5), Validators.maxLength(2000)]],
    });
  }

  getEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || payload.sub || null;
    } catch (e) {
      return null;
    }
  }

  submitFeedback() {
    if (this.feedbackForm.invalid) return;
  
    this.isSubmitting = true;
  
    const emailFromForm = this.feedbackForm.value.email;
    const emailFromToken = this.getEmailFromToken();
  
    const formData = {
      type: this.feedbackForm.value.feedbackType,
      description: `⭐️ التقييم: ${this.feedbackForm.value.rating} نجوم\n\n${this.feedbackForm.value.feedbackText}`,
      patientEmail: emailFromForm?.trim() || emailFromToken || '', 
    };
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.post('http://localhost:2020/api/feedback', formData, { headers, responseType: 'text' }).subscribe({
      next: (response: string) => {
        this.successMessage = response;
        this.errorMessage = '';
        this.snackBar.open('✅ تم الإرسال بنجاح', 'إغلاق', { duration: 1000 });
  
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
        this.errorMessage = 'حدث خطأ أثناء إرسال الشكوى. حاول مجددًا.';
        this.successMessage = '';
        this.snackBar.open('❌ فشل الإرسال', 'إغلاق', { duration: 1000 });
  
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      },
      complete: () => {
        this.isSubmitting = false;
        this.feedbackForm.reset();
        const firstInput = document.querySelector('select, input, textarea') as HTMLElement;
        if (firstInput) {
          setTimeout(() => {
            firstInput.focus();
          }, 100);
        }
      }
    });
  }
  
  
}
