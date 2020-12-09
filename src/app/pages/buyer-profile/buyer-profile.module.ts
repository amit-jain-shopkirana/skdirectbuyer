import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerProfileRoutingModule } from './buyer-profile-routing.module';
import { BuyerProfileOverviewComponent } from './components/buyer-profile-overview/buyer-profile-overview.component';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [BuyerProfileOverviewComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    BuyerProfileRoutingModule,
    SkDirectSharedModule
  ]
})
export class BuyerProfileModule { }
