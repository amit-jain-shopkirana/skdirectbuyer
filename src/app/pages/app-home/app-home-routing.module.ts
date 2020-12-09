import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth-guard.service';
import { AppHomeComponent } from './components/app-home/app-home.component';


const routes: Routes = [
  {path: ':apphomeId', component: AppHomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHomeRoutingModule { }
