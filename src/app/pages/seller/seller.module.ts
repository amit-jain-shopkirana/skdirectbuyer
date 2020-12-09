import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerListComponent } from './components/seller-list/seller-list.component';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { CookieService } from 'ngx-cookie-service';

import { AddressPopupComponent } from './components/address-popup/address-popup.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';

@NgModule({
  declarations: [SellerListComponent, SellerProfileComponent, AddressPopupComponent, OrderPlacedComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SkDirectSharedModule
    
    // MatDialogRef
  ],
  entryComponents: [
    AddressPopupComponent,OrderPlacedComponent
  ],
  providers: [CookieService]
})
export class SellerModule { }
