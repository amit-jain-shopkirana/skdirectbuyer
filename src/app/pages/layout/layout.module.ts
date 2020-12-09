import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';


@NgModule({
  declarations: [ContainerComponent, ToolbarComponent, BottomNavigationComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SkDirectSharedModule
  ]
})
export class LayoutModule { }
