import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkAccordionComponent } from './sk-accordion.component';

describe('SkAccordionComponent', () => {
  let component: SkAccordionComponent;
  let fixture: ComponentFixture<SkAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
