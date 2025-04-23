import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tip {
  title: string;
  description: string;
}

@Component({
  selector: 'app-medical-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-tips.component.html',
  styleUrls: ['./medical-tips.component.scss']
})
export class MedicalTipsComponent implements OnInit {

  tips: Tip[] = [
    {
      title: 'Drink Water Regularly',
      description: 'Maintain adequate water intake throughout the day to hydrate your body and boost blood circulation.'
    },
    {
      title: 'Eat Fruits and Vegetables',
      description: 'Ensure a variety of fruits and vegetables in your diet to get essential vitamins and minerals.'
    },
    {
      title: 'Exercise Regularly',
      description: 'Dedicate daily time for physical activities like walking, running, or strength training.'
    },
    {
      title: 'Get Enough Sleep',
      description: 'Aim for 7-8 hours of sleep daily to allow your body to relax and rejuvenate.'
    },
    {
      title: 'Avoid Smoking',
      description: 'Quitting smoking reduces the risk of many chronic diseases and improves overall health.'
    },
    {
      title: 'Limit Alcohol Consumption',
      description: 'Reducing alcohol intake helps lower health risks associated with it.'
    },
    {
      title: 'Maintain a Healthy Weight',
      description: 'Follow a balanced diet and stay active to maintain a healthy body weight.'
    },
    {
      title: 'Reduce Sugar and Salt Intake',
      description: 'Minimize high sugar and salt products to prevent health issues like hypertension and diabetes.'
    },
    {
      title: 'Schedule Regular Checkups',
      description: 'Undergo periodic medical exams for early detection of potential health problems.'
    },
    {
      title: 'Maintain Personal Hygiene',
      description: 'Practicing personal hygiene habits helps prevent many infectious diseases.'
    },
    {
      title: 'Manage Stress',
      description: 'Practice relaxation techniques like deep breathing or meditation to reduce daily stress.'
    },
    {
      title: 'Eat a Healthy Breakfast',
      description: 'Start your day with a balanced breakfast rich in proteins, grains, and fiber for better energy.'
    },
    {
      title: 'Improve Digestion with Fiber',
      description: 'Eating fiber-rich foods enhances digestion and reduces gastrointestinal issues.'
    },
    {
      title: 'Avoid Fast Food',
      description: 'Stay away from fast food to maintain digestive health and a healthy weight.'
    },
    {
      title: 'Use Supplements When Needed',
      description: 'Consult your doctor to determine if you need dietary supplements to support your health.'
    },
    {
      title: 'Avoid Harmful Chemicals',
      description: 'Limit exposure to harmful chemicals in cleaning products and industries to protect your body.'
    },
    {
      title: 'Maintain Oral Health',
      description: 'Regular tooth brushing and dentist visits help prevent oral and gum issues.'
    },
    {
      title: 'Practice Meditation and Relaxation',
      description: 'Use meditation and relaxation techniques to enhance mental well-being and reduce stress.'
    },
    {
      title: 'Balance Work and Rest Time',
      description: 'Maintain a balance between work and rest to avoid fatigue and improve productivity.'
    },
    {
      title: 'Consult a Doctor for Unusual Symptoms',
      description: 'Seek medical advice immediately if you notice any unusual symptoms.'
    },
    {
      title: 'Organize Meals',
      description: 'Divide your meals into small, balanced portions throughout the day to regulate energy and digestion.'
    },
    {
      title: 'Maintain Kitchen Hygiene',
      description: 'Ensure proper hand and utensil washing before and after food preparation to prevent food poisoning.'
    },
    {
      title: 'Make Time for Social Activities',
      description: 'Social interaction enhances mental health and reduces stress and isolation.'
    },
    {
      title: 'Engage in Mental Activities',
      description: 'Solve puzzles, read books, or learn new skills to stimulate your mind and reduce cognitive decline.'
    },
    {
      title: 'Set Time for Digital Detox',
      description: 'Reduce electronic device usage before sleep to improve sleep quality and reduce eye strain.'
    },
    {
      title: 'Enjoy Sunlight Safely',
      description: 'Get moderate sun exposure for Vitamin D while protecting your skin from harmful rays.'
    },
    {
      title: 'Maintain Healthy Social Relationships',
      description: 'Avoid isolation and participate in social activities to support mental and physical health.'
    },
    {
      title: 'Follow a Protein-Rich Diet',
      description: 'Eat protein from diverse sources like lean meats, eggs, and fish to support muscle health.'
    },
    {
      title: 'Eat Slowly',
      description: 'Avoid rushing meals and take your time to enjoy food, helping with digestion.'
    },
    {
      title: 'Manage Children\'s Screen Time',
      description: 'Limit children\'s screen time and encourage physical activities instead.'
    },
    {
      title: 'Avoid Preservatives',
      description: 'Try to reduce the intake of foods with preservatives and harmful chemicals.'
    },
    {
      title: 'Monitor Cholesterol Levels',
      description: 'Keep track of your cholesterol levels through regular tests and a healthy diet.'
    },
    {
      title: 'Control Blood Pressure',
      description: 'A low-sodium diet and regular exercise help maintain normal blood pressure levels.'
    },
    {
      title: 'Prioritize Good Sleep',
      description: 'Set aside enough time for quality sleep without overworking or screen exposure before bedtime.'
    },
    {
      title: 'Reduce Mental Stress',
      description: 'Practice meditation and yoga to alleviate mental tension and achieve better balance.'
    },
    {
      title: 'Take Care of Eye Health',
      description: 'Wear sunglasses to protect your eyes from UV rays and have regular eye checkups.'
    },
    {
      title: 'Protect Your Personal Identity',
      description: 'Care for your mental well-being and avoid psychological pressures that affect your comfort.'
    },
    {
      title: 'Learn Healthy Cooking Techniques',
      description: 'Experiment with healthy recipes to improve your dietary habits.'
    },
    {
      title: 'Listen to Your Body',
      description: 'Recognize your body\'s signals and don’t ignore any abnormal symptoms that require medical attention.'
    },
    {
      title: 'Make Time for Recreational Activities',
      description: 'Set aside time for recreational and sports activities to boost your physical and mental health.'
    },
    {
      title: 'Maintain Workplace Hygiene',
      description: 'Keep your workspace clean and avoid habits that may spread germs.'
    },
    {
      title: 'Limit Caffeine Intake',
      description: 'Reduce consumption of caffeinated beverages like coffee and tea to avoid insomnia and improve sleep quality.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
