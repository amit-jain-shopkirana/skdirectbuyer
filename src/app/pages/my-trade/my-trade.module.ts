import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTradeRoutingModule } from './my-trade-routing.module';
import { MyTradeComponent } from './components/my-trade/my-trade.component';
import { MyOrderDetailComponent } from './components/my-order-detail/my-order-detail.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';
import { FilterPageComponent } from './components/filter-page/filter-page.component';
import { AddReviewComponent } from './components/add-review/add-review.component';


@NgModule({
  declarations: [MyTradeComponent, MyOrderDetailComponent, MyOrderComponent, FilterPageComponent, AddReviewComponent],
  imports: [
    CommonModule,
    MyTradeRoutingModule,
    SkDirectSharedModule
  ]
})
export class MyTradeModule { }
