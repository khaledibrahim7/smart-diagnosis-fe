import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule], 
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  message: string = '';
  token: string = '';
  email: string = '';
  isCodeVerified: boolean = true; // نعرض الفورم مباشرة

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router
  ) {
    // استلام المعاملات من الرابط
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });

    // تهيئة فورم إعادة تعيين كلمة المرور
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // تنفيذ إعادة تعيين كلمة المرور
  onResetPassword() {
    const { newPassword, confirmPassword } = this.resetPasswordForm.value;

    if (newPassword !== confirmPassword) {
      this.message = "Passwords do not match";
      return;
    }

    this.http.post<any>('http://localhost:2020/api/auth/reset-password', {
      email: this.email,
      newPassword,
      token: this.token
    }).subscribe({
      next: (res) => {
        this.message = res.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.message = err.error.message || 'Failed to reset password';
      }
    });
  }
}
