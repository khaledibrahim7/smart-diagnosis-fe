import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core'; 
 
@Component({ 
  selector: 'app-diseases', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './diseases.component.html', 
  styleUrls: ['./diseases.component.scss'] 
}) 
export class DiseasesComponent { 
  diseases = [ 
    { 
      tag: 'headache', 
      patterns: [ 
        'I feel a dull pain in my head', 
        'I am experiencing sharp head pain', 
        'My head feels heavy and aching' 
      ], 
      response: 'Headaches can be caused by stress, dehydration, or sleep deprivation. Sometimes it could also be related to vision problems or neurological issues. If accompanied by nausea or sensitivity to light, seek medical attention.', 
      showResponse: false 
    }, 
    { 
      tag: 'chest_pain', 
      patterns: [ 
        'I have a tight feeling in my chest', 
        'There is pressure in my chest', 
        'I feel discomfort in my chest area' 
      ], 
      response: 'Chest pain might indicate serious health conditions such as heart attack, or it could be related to muscle strain or anxiety. If the pain is persistent or radiates to the left arm, seek immediate medical help.', 
      showResponse: false 
    }, 
    { 
      tag: 'fatigue', 
      patterns: [ 
        'I am always tired', 
        'I feel exhausted all the time', 
        'I don’t have the energy to do anything' 
      ], 
      response: 'Chronic fatigue could be a symptom of conditions like anemia, depression, or thyroid imbalance. A thorough examination and blood tests are recommended to identify the underlying cause.', 
      showResponse: false 
    }, 
    { 
      tag: 'cough', 
      patterns: [ 
        'I have a persistent cough', 
        'My throat feels scratchy and I keep coughing' 
      ], 
      response: 'A cough could be triggered by a cold, allergies, or more severe respiratory conditions like pneumonia. If the cough persists or is accompanied by blood, it’s important to visit a doctor.', 
      showResponse: false 
    }, 
    { 
      tag: 'stomach_pain', 
      patterns: [ 
        'I feel a sharp pain in my stomach', 
        'My abdomen is cramping' 
      ], 
      response: 'Stomach pain might stem from issues like indigestion, gastritis, or an ulcer. If the pain is severe or accompanied by vomiting or fever, it’s essential to get medical attention.', 
      showResponse: false 
    },
    // Add other diseases here as needed
  ]; 
 
  toggleResponse(disease: any) { 
    disease.showResponse = !disease.showResponse; 
  } 
} 
