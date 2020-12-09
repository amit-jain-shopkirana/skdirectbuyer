import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth-guard.service';
import { AddressPopupComponent } from './components/address-popup/address-popup.component';
import { SellerListComponent } from './components/seller-list/seller-list.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';


const routes: Routes = [
  {path: '', component: SellerListComponent, canActivate:[AuthGuard]},
  {path: ':sellerid', component: SellerProfileComponent},
  {path: ':placed/:sellerid', component: SellerProfileComponent},
  // {path: 'address', component: AddressPopupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
