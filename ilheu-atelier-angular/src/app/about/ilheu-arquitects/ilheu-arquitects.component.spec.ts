import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlheuArquitectsComponent } from './ilheu-arquitects.component';

describe('IlheuArquitectsComponent', () => {
  let component: IlheuArquitectsComponent;
  let fixture: ComponentFixture<IlheuArquitectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlheuArquitectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IlheuArquitectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
