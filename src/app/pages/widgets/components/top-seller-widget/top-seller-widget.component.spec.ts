import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellerWidgetComponent } from './top-seller-widget.component';

describe('TopSellerWidgetComponent', () => {
  let component: TopSellerWidgetComponent;
  let fixture: ComponentFixture<TopSellerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSellerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSellerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
