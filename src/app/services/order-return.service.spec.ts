import { TestBed } from '@angular/core/testing';

import { OrderReturnService } from './order-return.service';

describe('OrderReturnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderReturnService = TestBed.get(OrderReturnService);
    expect(service).toBeTruthy();
  });
});
