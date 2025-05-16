import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  slug: string = '';
  article?: { title: string; content: string };

  readonly articles: Record<string, { title: string; content: string }> = {
    'common-cold-vs-flu': {
      title: '🌡️ Understanding Common Cold vs. Flu',
      content: `
The common cold and the flu are both respiratory illnesses but they are caused by different viruses. Because these two types of illnesses have similar symptoms it can be difficult to tell the difference between them based on symptoms alone.

The flu is generally worse than the common cold and symptoms such as fever, body aches, extreme tiredness, and dry cough are more common and intense. Colds are usually milder than the flu and people with colds are more likely to have a runny or stuffy nose.

Symptoms of the Common Cold:
- Runny or stuffy nose
- Sore throat
- Mild to moderate cough
- Sneezing
- Mild fatigue

Symptoms of the Flu:
- High fever (100.4°F or higher)
- Dry cough
- Muscle aches
- Chills and sweats
- Headache
- Fatigue and weakness

How to Treat:
- Cold: Rest, fluids, over-the-counter decongestants and pain relievers.
- Flu: Antiviral medications (if prescribed early), rest, fluids, and fever reducers.

Prevention:
- Wash your hands regularly
- Avoid close contact with sick individuals
- Get a flu vaccine every year

When to Seek Help:
- If symptoms last more than 10 days or worsen
- Difficulty breathing or chest pain
- Persistent high fever
- In children: trouble feeding, bluish lips, extreme irritability

If your symptoms become severe or you are in a high-risk group (elderly, young children, people with chronic conditions), seek medical advice immediately.
`
    },

    'healthy-lifestyle': {
      title: '🍎 Tips for a Healthy Lifestyle',
      content: `
Living a healthy lifestyle doesn't mean you have to make huge changes all at once. Small habits can make a big difference over time.

Nutrition:
- Eat plenty of fruits and vegetables.
- Choose whole grains over refined ones.
- Reduce sugar and salt intake.
- Stay hydrated by drinking water instead of sugary drinks.
- Plan your meals in advance to avoid unhealthy choices.

Physical Activity:
- Aim for at least 30 minutes of moderate exercise most days of the week.
- Include both cardio and strength-training exercises.
- Take breaks from sitting — even a short walk can help.
- Use stairs instead of elevators, and consider walking or biking short distances.

Mental Health:
- Practice stress management through mindfulness or meditation.
- Get enough sleep (7–9 hours per night).
- Connect with friends and family regularly.
- Avoid overworking — make time for hobbies and relaxation.

Avoid Harmful Behaviors:
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

Types of Diabetes:
- Type 1: An autoimmune reaction destroys insulin-producing cells. Usually diagnosed in children and young adults.
- Type 2: Your body doesn’t use insulin properly. Common in adults, linked to obesity and inactivity.
- Gestational: Occurs during pregnancy, usually disappears after birth.

Symptoms:
- Frequent urination
- Increased thirst
- Unexplained weight loss
- Fatigue
- Blurred vision
- Slow-healing sores
- Tingling or numbness in hands or feet

Management:
- Monitor blood sugar regularly
- Healthy diet
- Regular exercise
- Medications or insulin as prescribed
- Avoid sugary drinks and processed foods

Prevention:
- Healthy weight
- Physical activity
- Balanced meals and portion control
- Regular check-ups

Early diagnosis and proper management help prevent complications like heart disease, nerve damage, kidney issues, and vision problems.
`
    },

    'heart-disease': {
      title: '🫀 Heart Diseases Explained',
      content: `
Heart disease refers to a range of conditions that affect your heart. These include coronary artery disease, arrhythmias, and congenital defects.

Common Types:
- Coronary Artery Disease (CAD)
- Heart Attack
- Heart Failure
- Arrhythmias
- Valve Disorders

Risk Factors:
- High blood pressure
- High cholesterol
- Smoking
- Obesity
- Diabetes
- Family history

Symptoms:
- Chest pain
- Shortness of breath
- Fatigue
- Swelling in legs or ankles

Prevention:
- Eat healthy
- Exercise regularly
- Avoid smoking
- Manage stress
- Regular check-ups

Seek medical help for chest pain, fainting, or severe shortness of breath.
`
    },

    'asthma-breathing-disorders': {
      title: '🌬️ Asthma and Breathing Disorders',
      content: `
Asthma is a chronic condition that affects the airways in the lungs, causing breathing difficulties.

What is Asthma:
- Airways become inflamed and narrowed
- Triggers include allergens, cold air, stress

Symptoms:
- Wheezing
- Coughing
- Chest tightness
- Shortness of breath

Other Breathing Disorders:
- COPD
- Chronic Bronchitis
- Allergic Rhinitis

Management:
- Use inhalers as prescribed
- Avoid triggers
- Practice breathing exercises
- Regular medical reviews

Seek urgent care during an asthma attack with severe breathing difficulty.
`
    },

    'respiratory-system': {
      title: '🫁 Respiratory System 101',
      content: `
The respiratory system brings oxygen into the body and removes carbon dioxide.

How It Works:
- Air passes from nose/mouth to trachea
- Then to lungs via bronchi
- Gas exchange occurs in alveoli

Common Issues:
- Asthma
- Infections (cold, flu)
- COPD
- Pulmonary embolism

Keeping It Healthy:
- Don’t smoke
- Get vaccines
- Exercise
- Stay hydrated
- Avoid pollution

See a doctor if you have chronic cough or difficulty breathing.
`
    },

    'breast-cancer-awareness': {
      title: '🎀 Breast Cancer Awareness',
      content: `
Breast cancer occurs when abnormal cells grow uncontrollably in the breast tissue.

Common Signs:
- Lump in breast or underarm
- Changes in breast size or skin
- Nipple discharge or inversion

Risk Factors:
- Family history
- Age
- Hormonal factors
- Obesity
- Alcohol

Prevention and Detection:
- Self-exams monthly
- Regular mammograms
- Healthy lifestyle
- Breastfeeding may lower risk

Early detection improves outcomes. Consult a doctor for any unusual changes.
`
    },

    'kidney-health': {
      title: '🧪 Kidney Health and Prevention',
      content: `
Your kidneys filter waste and regulate fluid balance in your body.

Common Issues:
- Chronic Kidney Disease (CKD)
- Kidney Stones
- Infections
- Polycystic kidney disease

Symptoms:
- Swelling in ankles
- Changes in urination
- Fatigue
- High blood pressure

Prevention:
- Stay hydrated
- Control blood pressure and sugar
- Low-sodium diet
- Avoid overusing painkillers
- No smoking

Regular check-ups help detect issues early, especially if you have risk factors.
`
    },

    'mental-health': {
      title: '🧠 Understanding Mental Health',
      content: `
Mental health includes emotional, psychological, and social well-being.

Common Disorders:
- Depression
- Anxiety
- Bipolar disorder
- PTSD
- OCD

Warning Signs:
- Persistent sadness
- Loss of interest
- Sleep or appetite changes
- Difficulty concentrating
- Social withdrawal

Support:
- Talk to someone you trust
- Therapy and counseling
- Mindfulness and relaxation
- Regular exercise
- Healthy eating and sleep

Mental health matters. You’re not alone — reach out for help when needed.
`
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.article = this.articles[this.slug];
  }
}
