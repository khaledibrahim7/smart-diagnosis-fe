import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, HttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DiagnosisComponent } from './pages/diagnosis/diagnosis.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VerifyResetCodeComponent } from './pages/auth/verify-reset-code/verify-reset-code.component';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import { AuthGuard } from './auth.guard';

import { LucideAngularModule } from 'lucide-angular';
import { Eye, EyeOff } from 'lucide';
import { FeedbackComponent } from './feedback/feedback.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TitleCasePipe } from '@angular/common';
import { DiseasesComponent } from './diseases/diseases.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { BmiCalculatorComponent } from './bmi-calculator.component';


const icons = {
  Eye,
  EyeOff
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  {
  path: 'mother-child-care',
  loadComponent: () =>
    import('./pages/mother-child-care/mother-child-care.component').then(
      (c) => c.MotherChildCareComponent
    ),
},
  {path: 'snackbar',loadComponent: () => import('./shared/snackbar/snackbar.component').then(m => m.SnackbarComponent)},
  { path: 'bmi', component: BmiCalculatorComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'chat/:id', component: DiagnosisComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'diagnosis', component: DiagnosisComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  {
    path: 'articles/:slug',
    component: ArticleDetailsComponent
  },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'verify-reset-code', component: VerifyResetCodeComponent },
  {
    path: 'emergency-help',
    loadComponent: () =>
      import('./pages/emergency-help/emergency-help.component').then(m => m.EmergencyHelpComponent)
  },
  {
    path: 'medical-tips',
    loadComponent: () =>
      import('./pages/medical-tips/medical-tips.component').then(m => m.MedicalTipsComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./feedback/feedback.component').then(m => m.FeedbackComponent)
  },
  {
  path: 'terms',
  loadComponent: () =>
    import('./pages/terms-and-conditions.component').then(m => m.TermsAndConditionsComponent),
},

  { path: 'diseases', component: DiseasesComponent },
 
{
  path: 'pharmacies',
  loadComponent: () => import('./pages/nearby-pharmacies.component').then(m => m.NearbyPharmaciesComponent)
},
  {
    path: 'mental-health',
    loadComponent: () =>
      import('./pages/mental-health/mental-health.component').then(m => m.MentalHealthComponent),
  },

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([
      (req, next) => {
        const token = localStorage.getItem('token');
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next(cloned);
        }
        return next(req);
      }
    ])),
        provideAnimations(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      LucideAngularModule,
      MatSnackBarModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    AuthService,
    SettingsService,
    AuthGuard,
    TitleCasePipe,
    TranslateService
  ]
};
