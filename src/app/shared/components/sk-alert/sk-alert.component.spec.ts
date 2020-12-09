import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkAlertComponent } from './sk-alert.component';

describe('SkAlertComponent', () => {
  let component: SkAlertComponent;
  let fixture: ComponentFixture<SkAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
