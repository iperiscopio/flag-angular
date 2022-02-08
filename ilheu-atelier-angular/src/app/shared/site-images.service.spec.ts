import { TestBed } from '@angular/core/testing';

import { SiteImagesService } from './site-images.service';

describe('SiteImagesService', () => {
  let service: SiteImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
