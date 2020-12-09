import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationWrapperComponent } from './bottom-navigation-wrapper.component';

describe('BottomNavigationWrapperComponent', () => {
  let component: BottomNavigationWrapperComponent;
  let fixture: ComponentFixture<BottomNavigationWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomNavigationWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
