import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mental-health',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mental-health.component.html',
  styleUrls: ['./mental-health.component.scss']
})
export class MentalHealthComponent {
  aiForm: FormGroup;
  aiAnswer: string | null = null;
  loading = false;

  testForm: FormGroup;
  testResult: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.testForm = this.fb.group({
      anxiety: [false],
      insomnia: [false],
      lossInterest: [false],
      fatigue: [false],
      appetiteChange: [false],
      concentration: [false],
      hopelessness: [false],
      irritability: [false],
    });

    this.aiForm = this.fb.group({
      question: [''],
    });
  }

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

 submitTest() {
   const answers = this.testForm.value;
   const score = Object.values(answers).filter(Boolean).length;

   if (score >= 6) {
     this.testResult = 'The results indicate strong symptoms of a mental disorder. It is recommended to consult a psychiatrist as soon as possible.';
   } else if (score >= 3) {
     this.testResult = 'You may have mild to moderate symptoms. Try to improve your lifestyle, and if symptoms persist, consider consulting a specialist.';
   } else {
     this.testResult = 'There are no strong indicators of a mental disorder, but keep monitoring your mental health regularly.';
   }
 }

 askAI() {
   const question = this.aiForm.value.question?.trim();
   if (!question) return;

   this.loading = true;
   this.aiAnswer = null;

   this.http.post<{ response: string }>('http://localhost:8000/chat', { message: question }).subscribe({
     next: (res) => {
       this.aiAnswer = res.response;
       this.loading = false;
     },
     error: () => {
       this.aiAnswer = 'An error occurred while connecting to the server. Please try again.';
       this.loading = false;
     }
   });
 }

 mentalIllnesses = [
   {
     name: 'Depression',
     symptoms: [
       'Persistent sadness for more than two weeks',
       'Loss of interest in daily activities',
       'Constant fatigue despite rest',
       'Difficulty making decisions',
       'Changes in appetite or weight',
       'Negative thoughts about self or life'
     ],
     tips: [
       'Do light exercise like walking for 30 minutes daily',
       'Talk to someone you trust or consult a therapist',
       'Establish a regular sleep routine and avoid staying up late',
       'Reduce social isolation by joining simple activities',
       'Avoid alcohol and excessive stimulants'
     ]
   },
   {
     name: 'Generalized Anxiety',
     symptoms: [
       'Constant and unexplained tension',
       'Always expecting the worst',
       'Difficulty focusing and paying attention',
       'Insomnia or interrupted sleep',
       'Muscle pain or chronic headaches',
       'Rapid heartbeat or sweating'
     ],
     tips: [
       'Practice deep breathing or meditation daily',
       'Reduce caffeine and artificial sugars',
       'Organize your time and schedule to reduce stress',
       'Write down your anxious thoughts in a notebook before bed',
       'Engage in calming hobbies'
     ]
   },
   {
     name: 'Panic Attacks',
     symptoms: [
       'Sudden shortness of breath',
       'Rapid heartbeat',
       'Feeling of impending doom or loss of control',
       'Sudden dizziness or nausea',
       'Feeling of choking or trembling'
     ],
     tips: [
       'Focus on your breathing and stay in a calm place',
       'Remind yourself that it’s just a panic attack and it will pass',
       'Practice grounding techniques (like touching objects around you)',
       'Temporarily avoid triggering places or situations',
       'Consult a psychologist for proper treatment'
     ]
   },
   {
     name: 'Obsessive-Compulsive Disorder (OCD)',
     symptoms: [
       'Unwanted repetitive thoughts (obsessions)',
       'Repetitive compulsive behaviors (like washing or checking)',
       'Severe anxiety when not performing the compulsion',
       'Difficulty concentrating due to intrusive thoughts'
     ],
     tips: [
       'Use Exposure and Response Prevention (ERP) techniques',
       'Gradually reduce compulsive checking with professional help',
       'Talk to a behavioral therapist',
       'Learn to distinguish obsessions from reality over time'
     ]
   },
   {
     name: 'Post-Traumatic Stress Disorder (PTSD)',
     symptoms: [
       'Recurring distressing memories of the traumatic event',
       'Nightmares or night terrors',
       'Avoidance of places or people linked to the incident',
       'Hypervigilance or sudden irritability',
       'Emotional numbness or isolation'
     ],
     tips: [
       'Talk to a trauma-specialized therapist',
       'Practice nervous system calming exercises (like EMDR or mindfulness)',
       'Write about your experience in a private journal to release emotions',
       'Don’t pressure yourself, healing takes time'
     ]
   }
 ];

 dailyTips = [
   'Practice deep breathing for 5 minutes every morning and evening',
   'Do an activity you enjoy daily, even something simple like drawing or walking',
   'Regulate your sleep: try to sleep and wake up at the same time daily',
   'Reduce screen time at least one hour before bed',
   'Drink enough water daily (at least 2 liters)',
   'Write down your feelings every evening to release mental pressure',
   'Avoid negative people and make time for yourself',
   'Listen to calm or nature sounds when feeling stressed',
   'Spend weekly time in mindful solitude and reflection',
   'Celebrate small achievements — they are steps toward balance'
 ];

 supportContacts = [
   {
     name: 'Mental Health Hotline - Egypt (Ministry of Health)',
     phone: '08008880700',
     website: 'https://www.mohp.gov.eg'
   },
   {
     name: 'Weyak - Friends of Mental Health Association - Qatar',
     phone: '+974 4468 2700',
     website: 'https://www.weyak.qa'
   },
   {
     name: 'Eradah Mental Health Center - Saudi Arabia',
     phone: '920033360',
     website: 'https://www.eradah.med.sa'
   },
   {
     name: 'National Suicide Prevention Lifeline - USA',
     phone: '988',
     website: 'https://988lifeline.org'
   },
   {
     name: 'World Health Organization - Mental Health Division',
     phone: '',
     website: 'https://www.who.int/health-topics/mental-health'
   }
 ];

 videos = [
   {
     title: 'How to Maintain Your Mental Health',
     url: 'https://www.youtube.com/embed/mNJqBllGCw8'
   },
   {
     title: 'Effective Relaxation Exercises',
     url: 'https://www.youtube.com/embed/QOYWNjdOjmA'
   }
 ];

}