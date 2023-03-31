import { TestBed } from '@angular/core/testing';

import { BaseapiService } from './baseapi.service';

describe('BaseapiService', () => {
  let service: BaseapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
