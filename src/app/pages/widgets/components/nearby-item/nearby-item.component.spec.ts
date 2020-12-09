import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyItemComponent } from './nearby-item.component';

describe('NearbyItemComponent', () => {
  let component: NearbyItemComponent;
  let fixture: ComponentFixture<NearbyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
