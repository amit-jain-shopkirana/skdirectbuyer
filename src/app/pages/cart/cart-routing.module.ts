import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth-guard.service';
import { CartOverviewComponent } from './components/cart-overview/cart-overview.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},  
  {path: '', component: CartOverviewComponent},
  {path: ':cart', component: CartOverviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
