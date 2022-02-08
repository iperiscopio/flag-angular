import { TestBed } from '@angular/core/testing';

import { FrontofficeService } from './frontoffice.service';

describe('FrontofficeService', () => {
  let service: FrontofficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontofficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
