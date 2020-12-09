import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemFoundComponent } from './no-item-found.component';

describe('NoItemFoundComponent', () => {
  let component: NoItemFoundComponent;
  let fixture: ComponentFixture<NoItemFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoItemFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoItemFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
