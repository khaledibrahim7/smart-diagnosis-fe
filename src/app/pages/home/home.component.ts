import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BmiCalculatorComponent } from "../../bmi-calculator.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) { }

  goToDiseasesPage() {
  this.router.navigate(['/diseases']); 
}

goToMotherhoodJourney() {
this.router.navigate(['/mother-child-care']);
}
}
