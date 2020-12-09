import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSellerComponent } from './search-seller.component';

describe('SearchSellerComponent', () => {
  let component: SearchSellerComponent;
  let fixture: ComponentFixture<SearchSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
