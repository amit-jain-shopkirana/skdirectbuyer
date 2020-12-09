import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavigationWrapperComponent } from './top-navigation-wrapper.component';

describe('TopNavigationWrapperComponent', () => {
  let component: TopNavigationWrapperComponent;
  let fixture: ComponentFixture<TopNavigationWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavigationWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
