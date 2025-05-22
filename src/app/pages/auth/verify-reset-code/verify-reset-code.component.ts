import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.scss']
})
export class VerifyResetCodeComponent {
  verifyForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required]
    });
  }

 onSubmit() {
  if (this.verifyForm.invalid) return;

  const { email, token } = this.verifyForm.value;

  this.http.post<any>('http://localhost:2020/api/auth/verify-reset-code', { email, token })
    .subscribe({
      next: res => {
        this.message = res.message;
        if (res.success) {
          setTimeout(() => {
            this.router.navigate(['/reset-password'], { queryParams: { email, token } });
          }, 2000);
        }
      },
      error: err => {
        this.message = err.error?.message || err.message || 'Something went wrong';
      }
    });
}

}
