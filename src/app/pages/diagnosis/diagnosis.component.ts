import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
  imports: [ RouterModule]
})
export class DiagnosisComponent {
startDiagnosis() {
throw new Error('Method not implemented.');
}
  message: string = "Welcome to the AI Diagnosis page!";
}


