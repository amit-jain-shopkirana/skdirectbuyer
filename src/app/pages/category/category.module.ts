import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import {DataViewModule} from 'primeng/dataview';
import { VariantsComponent } from './components/variants/variants.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';

@NgModule({
  declarations: [CategoryComponent, SubCategoryComponent, BrandsComponent, ItemListComponent, VariantsComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    DataViewModule,
    InfiniteScrollModule,
    SkDirectSharedModule
  ]
})
export class CategoryModule { }
