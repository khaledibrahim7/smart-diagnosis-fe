import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTipsComponent } from './medical-tips.component';

describe('MedicalTipsComponent', () => {
  let component: MedicalTipsComponent;
  let fixture: ComponentFixture<MedicalTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
