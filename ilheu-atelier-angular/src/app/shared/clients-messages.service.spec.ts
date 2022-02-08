import { TestBed } from '@angular/core/testing';

import { ClientsMessagesService } from './clients-messages.service';

describe('ClientsMessagesService', () => {
  let service: ClientsMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
