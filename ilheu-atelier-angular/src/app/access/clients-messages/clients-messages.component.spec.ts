import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMessagesComponent } from './clients-messages.component';

describe('ClientsMessagesComponent', () => {
  let component: ClientsMessagesComponent;
  let fixture: ComponentFixture<ClientsMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
