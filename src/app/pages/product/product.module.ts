import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';
import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SkDirectSharedModule,
    WidgetsModule
  ]
})
export class ProductModule { }
