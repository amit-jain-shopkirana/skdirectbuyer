import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerProfileOverviewComponent } from './buyer-profile-overview.component';

describe('BuyerProfileOverviewComponent', () => {
  let component: BuyerProfileOverviewComponent;
  let fixture: ComponentFixture<BuyerProfileOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerProfileOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerProfileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
