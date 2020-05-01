import { TestBed } from '@angular/core/testing';

import { DayDataService } from './day-data.service';

describe('DayDataService', () => {
  let service: DayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
