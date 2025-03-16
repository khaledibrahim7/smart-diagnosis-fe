import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DiagnosisComponent } from './pages/diagnosis/diagnosis.component';
import { AuthService } from './services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'diagnosis', component: DiagnosisComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(), 
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    AuthService
  ]
};
