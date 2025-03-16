import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgxIntlTelInputModule,
  ],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  userModel: UserModel = new UserModel();
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
    CountryISO.Egypt,
  ];
  SearchCountryField: any;
  phoneNumber?: string;
  selectedCountryCode: string = '+1';
  isSubmitting = false; // Loading state

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit() {
    if (this.isSubmitting) return; // Prevent multiple submissions
    this.isSubmitting = true;
  
    this.userModel.phoneNumber = this.getFullPhoneNumber();
    
    this.authService.signUp(this.userModel).subscribe({
      next: (response) => {
        console.log('Registration successful!....');
        this.router.navigate(['diagnosis']);
        this.isSubmitting = false; // Re-enable the button
      },
      error: (err) => {
        console.error('Registration failed. Please try again.', err.error.message);
        this.isSubmitting = false; // Re-enable the button on error
      },
    });
  }
  

  getFullPhoneNumber(): string {
    return this.selectedCountryCode! + this.phoneNumber;
  }
}