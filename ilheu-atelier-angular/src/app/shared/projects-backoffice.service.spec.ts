import { TestBed } from '@angular/core/testing';

import { ProjectsBackofficeService } from './projects-backoffice.service';

describe('ProjectsBackofficeService', () => {
  let service: ProjectsBackofficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsBackofficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
