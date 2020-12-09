import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Full_ROUTES } from './partial/full-layout.routes';
import { PartialComponent } from './partial/partial.component';


const routes: Routes = [
 
  { path: '', component: PartialComponent, children: Full_ROUTES },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
