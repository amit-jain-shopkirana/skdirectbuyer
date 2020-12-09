import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMethodInputComponent } from './login-method-input.component';

describe('LoginMethodInputComponent', () => {
  let component: LoginMethodInputComponent;
  let fixture: ComponentFixture<LoginMethodInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMethodInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMethodInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
