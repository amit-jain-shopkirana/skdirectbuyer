import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoryComponent } from './components/category/category.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { VariantsComponent } from './components/variants/variants.component';


const routes: Routes = [
  {path: 'category', component: CategoryComponent},
  {path: 'subcategory/:Id', component: SubCategoryComponent},
  {path: 'brand', component: BrandsComponent},
  {path: 'item', component: ItemListComponent},
  {path: 'variants/:sellerid/:Id', component: VariantsComponent},
  {path: 'item/:Id', component: ItemListComponent},
  {path: 'item/:Id/:CompanyId', component: ItemListComponent},
  {path: 'item/:Id/:CompanyId/:PageId', component: ItemListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
