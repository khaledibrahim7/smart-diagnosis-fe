import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherChildCareComponent } from './mother-child-care.component';

describe('MotherChildCareComponent', () => {
  let component: MotherChildCareComponent;
  let fixture: ComponentFixture<MotherChildCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotherChildCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotherChildCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
