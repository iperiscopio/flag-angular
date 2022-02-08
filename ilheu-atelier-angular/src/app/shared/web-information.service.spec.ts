import { TestBed } from '@angular/core/testing';

import { WebInformationService } from './web-information.service';

describe('WebInformationService', () => {
  let service: WebInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
