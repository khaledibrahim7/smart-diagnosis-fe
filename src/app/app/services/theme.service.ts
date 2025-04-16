import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkClass = 'dark-mode';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    if (typeof window !== 'undefined') {
      const isDark = document.body.classList.toggle(this.darkClass);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }

  loadTheme(): void {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add(this.darkClass);
      } else {
        document.body.classList.remove(this.darkClass);
      }
    }
  }
}
