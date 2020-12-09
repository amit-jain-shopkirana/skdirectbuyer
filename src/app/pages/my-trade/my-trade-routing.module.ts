import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { MyOrderDetailComponent } from './components/my-order-detail/my-order-detail.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { MyTradeComponent } from './components/my-trade/my-trade.component';


const routes: Routes = [
  {path: '', component: MyTradeComponent},
  {path: 'my-order', component: MyOrderComponent},
  {path: 'order-detail/:Id', component: MyOrderDetailComponent},
  {path: 'review/:Id', component: AddReviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTradeRoutingModule { }
