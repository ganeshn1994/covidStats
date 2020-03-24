import { TestBed } from '@angular/core/testing';

import { StatCountryService } from './stat-country.service';

describe('StatCountryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatCountryService = TestBed.get(StatCountryService);
    expect(service).toBeTruthy();
  });
});
