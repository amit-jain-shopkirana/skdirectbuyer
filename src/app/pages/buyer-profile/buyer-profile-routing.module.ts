import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerProfileOverviewComponent } from './components/buyer-profile-overview/buyer-profile-overview.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  {path: '', component: BuyerProfileOverviewComponent},
  {path: 'changepassword', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerProfileRoutingModule { }
