import { Component, ChangeDetectorRef, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';
import { ThemeService } from './app/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatSnackBarModule],
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
    // Only add event listener in browser environment
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.closeDropdownOnClickOutside.bind(this));
    }
  }

  ngOnDestroy() {
    // Clean up event listener when component is destroyed
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.closeDropdownOnClickOutside.bind(this));
    }
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdownOnClickOutside(event: MouseEvent) {
    // Check if the click was outside the dropdown
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }

  logout() {
    // Ensure localStorage is only accessed in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.updateLoginState();
    this.dropdownOpen = false;
    this.router.navigate(['/']).then(() => {
      this.cdr.detectChanges();
    });
  }

  updateLoginState() {
    // Ensure localStorage is only accessed in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
    this.showLogout = this.isLoggedIn;
  }
}
