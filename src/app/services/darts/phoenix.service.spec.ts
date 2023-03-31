import { TestBed } from '@angular/core/testing';

import { PhoenixService } from './phoenix.service';

describe('PhoenixService', () => {
  let service: PhoenixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoenixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
