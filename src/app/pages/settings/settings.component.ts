import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  settingsForm!: FormGroup;
  patientId: number | null = null;
  isLoading = false;

  constructor(
    private settingsService: SettingsService, 
    private fb: FormBuilder, 
    private router: Router
  ) {}

  updateDirectionBasedOnLanguage(): void {
    const lang = this.settingsForm.get('language')?.value || 'ar';

    if (lang === 'ar') {
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.getPatientId();
    this.applyStoredDarkMode();
    this.updateDirectionBasedOnLanguage();
  }

  ngAfterViewInit(): void {
    this.settingsForm.get('darkMode')?.valueChanges.subscribe((isDark) => {
      if (typeof isDark === 'boolean') {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark.toString());
      }
    });
    this.settingsForm.get('language')?.valueChanges.subscribe((lang) => {
      this.updateDirectionBasedOnLanguage();
    });
  }

  initForm(): void {
    this.settingsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: [''],
      age: ['', [Validators.min(1)]],
      gender: ['male'],
      language: ['ar'],
      darkMode: [false],
      newPassword: ['', Validators.minLength(6)],
      confirmNewPassword: [''],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmNewPassword')?.value;
    return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
  };

  getPatientId(): void {
    const storedId = localStorage.getItem('patientId');
    const token = localStorage.getItem('token');

    if (storedId && token) {
      this.patientId = +storedId;
      this.loadSettings();
    } else {
      console.error('❌ No patient ID or token found');
    }
  }

  applyStoredDarkMode(): void {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDark);
    this.settingsForm?.get('darkMode')?.setValue(isDark, { emitEvent: false });
  }

  loadSettings(): void {
    if (!this.patientId) return;

    this.settingsService.getSettings(this.patientId).subscribe({
      next: (data) => {
        this.settingsForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          age: data.age,
          gender: data.gender,
          language: data.language,
          darkMode: data.darkMode,
        });

        this.settingsForm.get('email')?.setValue(data.email);
      },
      error: (err) => console.error('❌ Error fetching settings:', err)
    });
  }

  saveSettings(): void {
    if (!this.patientId || this.settingsForm.invalid) return;

    const formData = { ...this.settingsForm.getRawValue() };

    const payload = {
      settings: {
        language: formData.language,
        darkMode: formData.darkMode
      },
      newPassword: formData.newPassword || null,
      confirmPassword: formData.confirmNewPassword || null
    };

    this.isLoading = true;
    this.settingsService.updateSettings(this.patientId, payload).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Settings updated successfully');
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ Error updating settings:', err);
        alert('Failed to update settings');
      }
    });
  }

  deleteAccount(): void {
    if (!this.patientId || !confirm('⚠️ Are you sure you want to delete your account?')) return;

    this.isLoading = true;
    this.settingsService.deleteAccount(this.patientId).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Account deleted successfully');
        localStorage.clear();
        this.settingsForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ Error deleting account:', err);
        alert('Failed to delete account');
      }
    });
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
}
