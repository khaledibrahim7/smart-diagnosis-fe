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
  "Laughter reduces stress hormones and boosts immunity.",
  "Exercise for at least 30 minutes every day to improve mood and health.",
  "Eat more vegetables — they provide essential vitamins and minerals.",
  "Stay away from processed foods high in salt and sugar.",
  "Wash your face twice a day to keep your skin healthy.",
  "Limit alcohol consumption to reduce liver damage.",
  "Practice mindfulness to reduce anxiety and improve your mental health.",
  "Avoid stress whenever possible — it can lead to long-term health problems.",
  "Use sunscreen to protect your skin from harmful UV rays.",
  "Take short breaks every hour to avoid eye strain when using screens.",
  "Keep a healthy weight to reduce the risk of chronic diseases.",
  "Take deep breaths to relax and reduce stress levels.",
  "Always floss your teeth daily to maintain oral health.",
  "Be sure to wash your hands before eating to avoid infection.",
  "Limit your screen time to reduce eye fatigue.",
  "Practice good posture to avoid back pain.",
  "If you're feeling down, talk to someone you trust about it.",
  "Get regular checkups with your doctor to stay on top of your health.",
  "Avoid excessive salt to reduce the risk of hypertension.",
  "Set small, achievable health goals to keep motivated.",
  "Always get vaccinated to protect yourself and others from diseases.",
  "Drink herbal teas like chamomile for better digestion and relaxation.",
  "Avoid smoking — it damages your lungs and increases the risk of cancer.",
  "Add more omega-3 fatty acids to your diet for brain health.",
  "Do some stretching exercises every morning to maintain flexibility.",
  "Stay active even in your free time — take the stairs instead of the elevator.",
  "Try to reduce your caffeine intake for better sleep quality.",
  "Regularly clean your phone, as it can be a breeding ground for germs.",
  "Drink green tea to boost your metabolism and protect your heart.",
  "Choose whole grains over refined grains for better digestion.",
  "Make sure to get enough calcium to strengthen your bones.",
  "Avoid junk food to reduce the risk of obesity and diabetes.",
  "Use a humidifier to improve air quality and prevent dry skin.",
  "Practice deep breathing exercises to calm your mind.",
  "Avoid skipping breakfast — it's important for maintaining energy levels.",
  "Take care of your mental health just as much as your physical health.",
  "Get regular dental checkups to avoid tooth decay and gum disease.",
  "Use a water filter to remove contaminants from your drinking water.",
  "Learn to say no to avoid taking on too much stress.",
  "Keep your workspace tidy to reduce anxiety and improve focus.",
  "Take regular breaks from sitting to reduce the risk of blood clots.",
  "Keep your feet clean and dry to avoid fungal infections.",
  "Make sure to wash your hands after using public transport.",
  "If you have a headache, try drinking water — dehydration is a common cause.",
  "Limit processed meats in your diet to improve heart health.",
  "Learn to manage your stress through hobbies, exercise, or relaxation techniques.",
  "Engage in social activities to improve your mood and mental well-being.",
  "Eat nuts in moderation to boost brain function and heart health.",
  "Avoid taking long hot showers, as they can dry out your skin.",
  "Choose healthy snacks like fruits or nuts instead of chips or candy.",
  "Practice gratitude every day to boost your emotional well-being.",
  "Always wear a seatbelt while driving to protect yourself in case of an accident.",
  "Get enough magnesium to help reduce muscle cramps and improve sleep.",
  "Read the food labels to make healthier choices while grocery shopping.",
  "Try to get at least 150 minutes of moderate exercise each week.",
  "Practice good hygiene to reduce the spread of infections.",
  "Don’t skip meals, as this can affect your metabolism.",
  "Try drinking a glass of water before each meal to prevent overeating.",
  "Take vitamin supplements only when necessary, and after consulting a doctor.",
  "Use essential oils like lavender to help you relax and sleep better.",
  "Invest in a good pair of shoes to avoid foot problems.",
  "Limit your sugar intake to prevent cavities and tooth decay.",
  "Stay hydrated throughout the day to maintain energy levels.",
  "Keep your nails trimmed and clean to avoid infections.",
  "Monitor your blood pressure regularly to catch any issues early.",
  "Practice regular hand sanitization to avoid the spread of viruses.",
  "Consider adding turmeric to your diet for its anti-inflammatory benefits.",
  "Avoid excessive exposure to blue light from screens to protect your eyes.",
  "Take care of your mental health by seeking professional help when needed.",
  "Never ignore symptoms — early detection is key to better treatment outcomes.",
  "Stretch before exercising to avoid injury and improve flexibility.",
  "Drink lemon water in the morning to aid digestion and detoxification.",
  "Learn about the symptoms of common diseases to catch them early.",
  "Make sure to get enough fiber in your diet for digestive health.",
  "Always make time for yourself and your mental well-being.",
  "Avoid eating late at night to prevent indigestion and poor sleep.",
  "Try a balanced workout routine that includes strength and cardio exercises.",
  "Stay informed about health trends, but always consult a doctor before making changes.",
  "Reduce your sugar intake to prevent insulin resistance and diabetes.",
  "Use an eye cream to keep the skin around your eyes hydrated and healthy.",
  "Take a break if you’re feeling overwhelmed to avoid burnout.",
  "Brush your teeth for at least two minutes to ensure thorough cleaning.",
  "Avoid standing for long periods of time to prevent varicose veins.",
  "Choose organic food whenever possible to reduce exposure to chemicals.",
  "Incorporate mindfulness practices into your routine to reduce stress.",
  "Add more antioxidants to your diet for better skin and overall health.",
  "Make sure to get enough iron, especially if you're pregnant or menstruating.",
  "Pay attention to the expiry dates of your medications.",
  "Wash your hands before and after handling food to prevent contamination.",
  "Try to include more plant-based meals in your diet for better health.",
  "Avoid exposure to secondhand smoke to reduce lung cancer risk.",
  "Use a tongue scraper to maintain oral hygiene.",
  "Don’t skip regular health screenings to catch potential issues early."
] ;


  todayTip: string = '';
  showSnackbar: boolean = false;

  constructor() {}
ngOnInit(): void {
    const todayDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const storedTipData = localStorage.getItem('dailyTip');

    if (storedTipData) {
      const parsed = JSON.parse(storedTipData);
      if (parsed.date === todayDate) {
        this.todayTip = parsed.tip;
      } else {
        this.setNewTip(todayDate);
      }
    } else {
      this.setNewTip(todayDate);
    }

    this.showSnackbar = true;

    setTimeout(() => {
      this.showSnackbar = false;
    }, 5000);
  }

  private setNewTip(todayDate: string) {
    const dayIndex = new Date().getDate() % this.tips.length;
    this.todayTip = this.tips[dayIndex];
    localStorage.setItem('dailyTip', JSON.stringify({ date: todayDate, tip: this.todayTip }));
  }
}