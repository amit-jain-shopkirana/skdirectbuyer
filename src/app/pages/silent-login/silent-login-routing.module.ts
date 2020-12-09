import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { SilentLoginComponent } from './components/silent-login/silent-login.component';


const routes: Routes = [
  {path: 'mobile/:mobile', component: SilentLoginComponent},
  // { path: '**', component: SilentLoginComponent }, //page not found route
  // { path: 'login', component: LoginPageComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SilentLoginRoutingModule { }
