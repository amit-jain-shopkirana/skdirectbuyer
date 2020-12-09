import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHomeRoutingModule } from './app-home-routing.module';
import { AppHomeComponent } from './components/app-home/app-home.component';
import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [AppHomeComponent],
  imports: [
    CommonModule,
    AppHomeRoutingModule,
    WidgetsModule
  ]
})
export class AppHomeModule { }
