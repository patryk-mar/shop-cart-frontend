import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedPayComponent } from './proceed-pay.component';

describe('ProceedPayComponent', () => {
  let component: ProceedPayComponent;
  let fixture: ComponentFixture<ProceedPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
