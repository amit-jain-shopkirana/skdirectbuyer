import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartOverviewComponent } from './components/cart-overview/cart-overview.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
// import { BuyerProfileChildModule } from 'src/app/child-components/buyer-profile-child/buyer-profile-child.module';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';




@NgModule({
  declarations: [CartOverviewComponent, CheckoutComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    // BuyerProfileChildModule,
    SkDirectSharedModule
  ]
})
export class CartModule { }
