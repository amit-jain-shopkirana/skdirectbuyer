import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySellerWidgetComponent } from './category-seller-widget.component';

describe('CategorySellerWidgetComponent', () => {
  let component: CategorySellerWidgetComponent;
  let fixture: ComponentFixture<CategorySellerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySellerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySellerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
