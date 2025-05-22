import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
isLoading = false;



  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
onSubmit() {
  if (this.forgotPasswordForm.invalid) {
    this.message = "Please enter a valid email.";
    return;
  }

  this.isLoading = true;
  const { email } = this.forgotPasswordForm.value;

  this.http.post<any>('http://localhost:2020/api/auth/forgot-password', { email }).subscribe({
    next: (res) => {
      this.message = res.message;
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigate(['/verify-reset-code'], { queryParams: { email } });
      }, 2000);
    },
    error: (err) => {
      this.message = err.error.message || 'Something went wrong';
      this.isLoading = false;
    }
  });
}
}
