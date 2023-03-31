import { TestBed } from '@angular/core/testing';

import { DofusService } from './dofus.service';

describe('DofusService', () => {
  let service: DofusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DofusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
