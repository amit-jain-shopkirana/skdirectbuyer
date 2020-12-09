import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTradeComponent } from './my-trade.component';

describe('MyTradeComponent', () => {
  let component: MyTradeComponent;
  let fixture: ComponentFixture<MyTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
