import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationInputComponent } from './verification-input.component';

describe('VerificationInputComponent', () => {
  let component: VerificationInputComponent;
  let fixture: ComponentFixture<VerificationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
