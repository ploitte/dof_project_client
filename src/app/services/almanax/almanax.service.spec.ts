import { TestBed } from '@angular/core/testing';

import { AlmanaxService } from './almanax.service';

describe('AlmanaxService', () => {
  let service: AlmanaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmanaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
