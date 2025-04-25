import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  standalone: true,

})
export class ArticleDetailsComponent implements OnInit {
  slug: string = '';
  article: any;

  articles = {
    'common-cold-vs-flu': {
      title: '🌡️ Understanding Common Cold vs. Flu',
      content: `
      The common cold and the flu are both respiratory illnesses, but they are caused by different viruses. Because these two types of illnesses have similar symptoms, it can be difficult to tell the difference between them based on symptoms alone.
      
      The flu is generally worse than the common cold, and symptoms such as fever, body aches, extreme tiredness, and dry cough are more common and intense. Colds are usually milder than the flu and people with colds are more likely to have a runny or stuffy nose.
      
      ### Symptoms of the Common Cold:
      - Runny or stuffy nose
      - Sore throat
      - Mild to moderate cough
      - Sneezing
      - Fatigue (mild)
      
      ### Symptoms of the Flu:
      - High fever (100.4°F or higher)
      - Dry cough
      - Muscle aches
      - Chills and sweats
      - Headache
      - Fatigue and weakness
      
      ### How to Treat:
      - **Cold**: Rest, fluids, over-the-counter decongestants and pain relievers.
      - **Flu**: Antiviral medications (if prescribed early), rest, fluids, and fever reducers.
      
      ### Prevention:
      - Wash your hands regularly
      - Avoid close contact with sick individuals
      - Get a flu vaccine every year
      
      ### When to Seek Help:
      - If symptoms last more than 10 days or worsen
      - Difficulty breathing or chest pain
      - Persistent high fever
      - In children: trouble feeding, bluish lips, extreme irritability
      
      If your symptoms become severe, or if you are in a high-risk group (elderly, young children, people with chronic conditions), seek medical advice immediately.
      `
      
    },
    'healthy-lifestyle': {
      title: '🍎 Tips for a Healthy Lifestyle',
      content: `
      Living a healthy lifestyle doesn't mean you have to make huge changes all at once. Small habits can make a big difference over time.
      
      ### Nutrition:
      - Eat plenty of fruits and vegetables.
      - Choose whole grains over refined ones.
      - Reduce sugar and salt intake.
      - Stay hydrated by drinking water instead of sugary drinks.
      - Plan your meals in advance to avoid unhealthy choices.
      
      ### Physical Activity:
      - Aim for at least 30 minutes of moderate exercise most days of the week.
      - Include both cardio and strength-training exercises.
      - Take breaks from sitting — even a short walk can help.
      - Use stairs instead of elevators, and consider walking or biking short distances.
      
      ### Mental Health:
      - Practice stress management through mindfulness or meditation.
      - Get enough sleep (7–9 hours per night).
      - Connect with friends and family regularly.
      - Avoid overworking — make time for hobbies and relaxation.
      
      ### Avoid Harmful Behaviors:
      - Don’t smoke and avoid secondhand smoke.
      - Limit alcohol intake.
      - Avoid excessive screen time and improve posture.
      - Reduce caffeine if it affects your sleep.
      
      Start with one habit and gradually build a routine that supports your long-term health goals. Remember: consistency beats intensity!
      `
      
    },
    'what-is-diabetes': {
      title: '🧬 What is Diabetes?',
      content: `
      Diabetes is a chronic condition that affects how your body turns food into energy. Most of the food you eat is broken down into sugar (glucose) and released into your bloodstream.
      
      When your blood sugar goes up, your pancreas releases insulin to help your cells absorb the sugar. With diabetes, either your body doesn’t make enough insulin or can’t use it effectively.
      
      ### Types of Diabetes:
      - **Type 1 Diabetes**: An autoimmune reaction destroys insulin-producing cells. It’s usually diagnosed in children and young adults.
      - **Type 2 Diabetes**: Your body doesn’t use insulin properly. It’s more common in adults and often linked to obesity and inactivity.
      - **Gestational Diabetes**: Occurs during pregnancy and usually disappears after birth.
      
      ### Symptoms:
      - Frequent urination
      - Increased thirst
      - Unexplained weight loss
      - Fatigue
      - Blurred vision
      - Slow-healing sores
      - Tingling or numbness in hands or feet (especially in type 2)
      
      ### Management:
      - Monitor blood sugar regularly
      - Maintain a healthy diet
      - Exercise regularly
      - Take medications or insulin as prescribed
      - Avoid sugary drinks and processed foods
      
      ### Prevention & Lifestyle:
      - Keep a healthy weight
      - Be physically active
      - Eat balanced meals and control portion sizes
      - Get regular check-ups and screenings
      
      Early diagnosis and proper management are essential to avoid complications such as heart disease, nerve damage, kidney issues, and eye problems. Diabetes is manageable — education, support, and lifestyle choices are key!
      `
      
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.article = this.articles[this.slug as keyof typeof this.articles];
  }
}
