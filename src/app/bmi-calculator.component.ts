import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';




@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.scss']
})
export class BmiCalculatorComponent implements AfterViewInit {
  bmiForm: FormGroup;
  calorieForm: FormGroup;
  bmiHistoryForm: FormGroup;

  result: number | null = null;
  status: string = '';
  statusClass: string = '';
  tipText: string = '';
  bmiPercentage: number = 0;

  calorieResult: number | null = null;
  calorieTip: string = '';

  bmiRecords: { date: string; bmi: number }[] = [];

  personalNotes: string = '';

  heightUnit: 'cm' | 'm' = 'cm';
  weightUnit: 'kg' | 'lb' = 'kg';

  @ViewChild('bmiChart') bmiChartRef!: ElementRef<HTMLCanvasElement>;
  bmiChart: any;




  constructor(private fb: FormBuilder) {
    this.bmiForm = this.fb.group({
      weight: [null, [Validators.required, Validators.min(1)]],
      height: [null, [Validators.required, Validators.min(50)]],
    });

    this.calorieForm = this.fb.group({
      age: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['male', Validators.required],
      weight: [null, [Validators.required, Validators.min(1)]],
      height: [null, [Validators.required, Validators.min(50)]],
      activityLevel: ['sedentary', Validators.required]
    });

    this.bmiHistoryForm = this.fb.group({
      date: [null, Validators.required],
      bmi: [null, [Validators.required, Validators.min(10), Validators.max(40)]],
    });
  }

 ngAfterViewInit() {
const storedRecords = localStorage.getItem('bmiRecords');
  if (storedRecords) {
    this.bmiRecords = JSON.parse(storedRecords);
  }

  this.createChart();
}


  toggleHeightUnit() {
    const currentHeight = this.bmiForm.value.height;
    if (currentHeight === null || currentHeight === undefined) return;

    if (this.heightUnit === 'cm') {
      this.bmiForm.patchValue({ height: +(currentHeight / 100).toFixed(2) });
      this.heightUnit = 'm';
      this.bmiForm.get('height')?.setValidators([Validators.required, Validators.min(0.5)]);
    } else {
      this.bmiForm.patchValue({ height: Math.round(currentHeight * 100) });
      this.heightUnit = 'cm';
      this.bmiForm.get('height')?.setValidators([Validators.required, Validators.min(50)]);
    }
    this.bmiForm.get('height')?.updateValueAndValidity();
  }

  toggleWeightUnit() {
    const currentWeight = this.bmiForm.value.weight;
    if (currentWeight === null || currentWeight === undefined) return;

    if (this.weightUnit === 'kg') {
      this.bmiForm.patchValue({ weight: +(currentWeight * 2.20462).toFixed(1) });
      this.weightUnit = 'lb';
      this.bmiForm.get('weight')?.setValidators([Validators.required, Validators.min(2.2)]);
    } else {
      this.bmiForm.patchValue({ weight: +(currentWeight / 2.20462).toFixed(1) });
      this.weightUnit = 'kg';
      this.bmiForm.get('weight')?.setValidators([Validators.required, Validators.min(1)]);
    }
    this.bmiForm.get('weight')?.updateValueAndValidity();
  }

  calculateBMI() {
    let weight = this.bmiForm.value.weight;
    let height = this.bmiForm.value.height;
    if (weight == null || height == null) return;

    if (this.weightUnit === 'lb') {
      weight = weight / 2.20462;
    }
    if (this.heightUnit === 'cm') {
      height = height / 100;
    }

    const bmi = weight / (height * height);
    this.result = +bmi.toFixed(1);
    this.status = this.getStatus(this.result);
    this.statusClass = this.getStatusClass(this.result);
    this.tipText = this.getTip(this.result);
    this.bmiPercentage = this.calculateIndicatorPosition(this.result);
  }

  resetForm() {
    this.bmiForm.reset();
    this.result = null;
    this.status = '';
    this.statusClass = '';
    this.tipText = '';
    this.bmiPercentage = 0;

    this.heightUnit = 'cm';
    this.weightUnit = 'kg';

    this.bmiForm.get('height')?.setValidators([Validators.required, Validators.min(50)]);
    this.bmiForm.get('height')?.updateValueAndValidity();

    this.bmiForm.get('weight')?.setValidators([Validators.required, Validators.min(1)]);
    this.bmiForm.get('weight')?.updateValueAndValidity();
  }

 getStatus(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

getTip(bmi: number): string {
  if (bmi < 18.5) return 'Try to eat more calorie-dense and protein-rich foods, and do light exercise.';
  if (bmi < 25) return 'Maintain your healthy lifestyle and stay active daily.';
  if (bmi < 30) return 'Reduce sugar and fat intake, and try to exercise at least 3 times a week.';
  return 'It is recommended to consult a nutritionist and create a healthy weight loss plan.';
}

  getStatusClass(bmi: number): string {
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  }

  calculateIndicatorPosition(bmi: number): number {
    const minBMI = 10;
    const maxBMI = 40;
    const clamped = Math.max(minBMI, Math.min(bmi, maxBMI));
    return ((clamped - minBMI) / (maxBMI - minBMI)) * 100;
  }

  calculateCalories() {
    if (this.calorieForm.invalid) return;

    const age = this.calorieForm.value.age;
    const gender = this.calorieForm.value.gender;
    const weight = this.calorieForm.value.weight;
    const height = this.calorieForm.value.height;
    const activity = this.calorieForm.value.activityLevel;

    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }

    const activityFactors: any = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    this.calorieResult = Math.round(bmr * (activityFactors[activity] || 1.2));

      if (this.calorieResult < 1500) {
      this.calorieTip = 'Eat small, frequent meals and increase your protein intake.';
    } else if (this.calorieResult < 2500) {
      this.calorieTip = 'Maintain a balance between your calorie intake and daily activity.';
    } else {
      this.calorieTip = 'Be careful not to overeat and try to increase your physical activity.';
    }

  }

 addBmiRecord() { 
  if (this.bmiHistoryForm.invalid) return;

  this.bmiRecords.push({ 
    date: this.bmiHistoryForm.value.date, 
    bmi: this.bmiHistoryForm.value.bmi 
  }); 

  localStorage.setItem('bmiRecords', JSON.stringify(this.bmiRecords));  

  this.bmiHistoryForm.reset(); 
  this.updateChart(); 
}



  createChart() {
    if (!this.bmiChartRef) return;
    const ctx = this.bmiChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.bmiChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.bmiRecords.map(r => r.date),
        datasets: [{
          label: 'Body Mass Index',
          data: this.bmiRecords.map(r => r.bmi),
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { min: 10, max: 40 }
        }
      }
    });
  }

  updateChart() {
    if (!this.bmiChart) return;
    this.bmiChart.data.labels = this.bmiRecords.map(r => r.date);
    this.bmiChart.data.datasets[0].data = this.bmiRecords.map(r => r.bmi);
    this.bmiChart.update();
  }
}
