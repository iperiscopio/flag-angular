import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlheuAtelierComponent } from './ilheu-atelier.component';

describe('IlheuAtelierComponent', () => {
  let component: IlheuAtelierComponent;
  let fixture: ComponentFixture<IlheuAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlheuAtelierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IlheuAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
