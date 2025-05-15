import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  tips: string[] = [
    "Drink at least 8 glasses of water a day to stay hydrated.",
    "Did you know? Regular walking boosts heart health.",
    "Wash your hands for 20 seconds to prevent germs.",
    "Get at least 7-8 hours of sleep every night.",
    "Avoid sugary drinks — they can cause weight gain and diabetes.",
    "Eat more fiber-rich foods for better digestion.",
    "Smoking kills. Quitting reduces risk of heart disease.",
    "Sunlight is a great source of Vitamin D — get 15 minutes daily.",
    "Always complete your prescribed antibiotics, even if you feel better.",
    "Laughter reduces stress hormones and boosts immunity."
  ];

  todayTip: string = '';
  showSnackbar: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const dayIndex = new Date().getDate() % this.tips.length;
    this.todayTip = this.tips[dayIndex];
    this.showSnackbar = true;

    setTimeout(() => {
      this.showSnackbar = false;
    }, 5000); 
  }
}
