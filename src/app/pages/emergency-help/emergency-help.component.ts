import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-help',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emergency-help.component.html',
  styleUrls: ['./emergency-help.component.scss'],
})
export class EmergencyHelpComponent {
  emergencyForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.emergencyForm = this.fb.group({
      country: ['', Validators.required],
    });
  }

  emergencyNumbers: Record<string, string> = {
    'USA': '911',
    'UK': '999',
    'Canada': '911',
    'Australia': '000',
    'India': '112',
    'Egypt': '123',
    'Germany': '112',
    'France': '112',
    'Italy': '118',
    'Spain': '112',
    'Japan': '119',
    'South Korea': '119',
    'Brazil': '192',
    'Mexico': '911',
    'Russia': '103',
    'China': '120',
    'Saudi Arabia': '997',
    'Turkey': '112',
    'South Africa': '10177',
    'Argentina': '107',
    'Chile': '131',
    'Nigeria': '112',
    'Indonesia': '118',
    'Thailand': '1669',
    'Malaysia': '999',
    'Philippines': '911',
    'Pakistan': '115',
    'Bangladesh': '199',
    'Ukraine': '103',
    'Israel': '101',
    'New Zealand': '111',
    'Greece': '166',
    'Poland': '999',
    'Portugal': '112',
    'Belgium': '112',
    'Netherlands': '112',
    'Sweden': '112',
    'Norway': '113',
    'Denmark': '112',
    'Finland': '112',
    'Switzerland': '144',
    'Austria': '144',
    'Czech Republic': '155',
    'Romania': '112',
    'Hungary': '104',
    'Slovakia': '155',
    'Bulgaria': '150',
    'Croatia': '194',
    'Serbia': '194',
    'Bosnia and Herzegovina': '124',
    'Montenegro': '124',
    'Kosovo': '194',
    'Albania': '127',
    'Macedonia': '194',
    'Belarus': '103',
    'Latvia': '113',
    'Lithuania': '103',
    'Estonia': '112',
    'Malta': '112',
    'Luxembourg': '112',
    'Liechtenstein': '144',
    'Monaco': '112',
    'San Marino': '118',
    'Andorra': '116',
    'Vatican City': '118',
    'Armenia': '103',
    'Georgia': '113',
    'Kazakhstan': '103',
    'Uzbekistan': '103',
    'Turkmenistan': '03',
    'Kyrgyzstan': '103',
    'Tajikistan': '03',
    'Azerbaijan': '103',
    'Mongolia': '103',
    'Vietnam': '115',
    'Sri Lanka': '1990',
    'Nepal': '102',
    'Cambodia': '119',
    'Laos': '1195',
    'Myanmar': '192',
    'Brunei': '991',
    'Singapore': '995',
    'Hong Kong': '999',
    'Macau': '999',
    'Taiwan': '119',
    'Mauritius': '114',
    'Seychelles': '999',
    'Fiji': '911',
    'Papua New Guinea': '111',
    'Solomon Islands': '999',
    'Vanuatu': '112',
    'Samoa': '911',
    'Tonga': '911',
    'American Samoa': '911',
    'Guam': '911',
    'Northern Mariana Islands': '911',
    'Puerto Rico': '911',
    'Bermuda': '911',
    'Cayman Islands': '911',
    'Bahamas': '919',
    'Barbados': '511',
    'Jamaica': '110',
    'Saint Lucia': '911',
    'Saint Vincent and the Grenadines': '999',
    'Antigua and Barbuda': '911',
    'Dominica': '999',
    'Saint Kitts and Nevis': '911',
    'Grenada': '911',
    'Trinidad and Tobago': '811',
    'Belize': '911',
    'Guatemala': '123',
    'Honduras': '195',
    'Costa Rica': '128',
    'Panama': '911',
    'El Salvador': '132',
    'Nicaragua': '128',
    'Cuba': '104',
    'Haiti': '116',
  };

  countryList = Object.keys(this.emergencyNumbers).sort();

  getEmergencyNumber(country: string): string {
    return this.emergencyNumbers[country] || 'Not available';
  }

  makeCall(): void {
    const country = this.emergencyForm.get('country')?.value;
    const number = this.getEmergencyNumber(country);
    if (number !== 'Not available') {
      window.location.href = `tel:${number}`;
    }
  }

   navigateToPharmacies() {
    this.router.navigate(['/pharmacies']); 
  }
}
