import { Component, ChangeDetectorRef, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';
import { ThemeService } from './app/services/theme.service';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatSnackBarModule,SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'smart-diagnosis';
  dropdownOpen = false;
  showLogout = false;
  isLoggedIn = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateLoginState();
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.closeDropdownOnClickOutside.bind(this));
      this.checkTokenExpiration();  
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.closeDropdownOnClickOutside.bind(this));
    }
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdownOnClickOutside(event: MouseEvent) {
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration'); 
    }
    this.updateLoginState();
    this.dropdownOpen = false;
    this.router.navigate(['/']).then(() => {
      this.cdr.detectChanges();
    });
  }

  updateLoginState() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
    this.showLogout = this.isLoggedIn;
  }

  checkTokenExpiration() {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
      this.logout(); 
    }
  }
}
