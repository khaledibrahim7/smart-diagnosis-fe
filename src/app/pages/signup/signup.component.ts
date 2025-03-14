import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  standalone:true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  userModel: UserModel = new UserModel();


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }


  onSubmit() {
    console.log('User registered:', this.userModel);
  
    this.authService.signUp(this.userModel).subscribe({
      next: (response) => {
        console.log('Registration successful! Please log in.');
        this.router.navigate(['diagnosis']); 
      },
      error: (err) => {
        console.error('Registration failed. Please try again.', err.error.message);
      }
    });
  }

}  