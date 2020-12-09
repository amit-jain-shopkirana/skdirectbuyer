import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


const routes: Routes = [
  {path: 'detail/:sellerProductId', component: ProductDetailComponent},
  {path: 'detail/:sellerProductId/:PageId', component: ProductDetailComponent},
  {path: 'detail/:sellerProductId/:BrandId/:PageId', component: ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
