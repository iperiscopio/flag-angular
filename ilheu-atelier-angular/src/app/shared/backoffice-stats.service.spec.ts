import { TestBed } from '@angular/core/testing';

import { BackofficeStatsService } from './backoffice-stats.service';

describe('BackofficeStatsService', () => {
  let service: BackofficeStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackofficeStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
