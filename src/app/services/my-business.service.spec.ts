import { TestBed } from '@angular/core/testing';

import { MyBusinessService } from './my-business.service';

describe('MyBusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyBusinessService = TestBed.get(MyBusinessService);
    expect(service).toBeTruthy();
  });
});
