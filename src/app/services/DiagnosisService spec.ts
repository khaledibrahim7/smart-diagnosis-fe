import { TestBed } from '@angular/core/testing';

import { DiagnosisService  } from './DiagnosisService';

describe('ChatService', () => {
  let service: DiagnosisService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosisService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
