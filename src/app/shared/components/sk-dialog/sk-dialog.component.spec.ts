import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkDialogComponent } from './sk-dialog.component';

describe('SkDialogComponent', () => {
  let component: SkDialogComponent;
  let fixture: ComponentFixture<SkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
