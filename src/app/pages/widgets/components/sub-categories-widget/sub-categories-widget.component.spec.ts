import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesWidgetComponent } from './sub-categories-widget.component';

describe('SubCategoriesWidgetComponent', () => {
  let component: SubCategoriesWidgetComponent;
  let fixture: ComponentFixture<SubCategoriesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoriesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoriesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
