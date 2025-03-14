import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule]})

export class LoginComponent {
  loginForm: FormGroup;
  rememberMe?: boolean;
  email: any;
  password: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {

    this.authService.login(this.email, this.password)
    .subscribe({
      next: (response) => {
        console.log("Login successful!", response);
        this.router.navigate(['diagnosis']); 
      },
      error: (error) => {
        console.error("Login failed!", error);
      }
    });
  }

  navigateToSignUp() {
    console.log('Navigating to sign-up page...');
  }
}