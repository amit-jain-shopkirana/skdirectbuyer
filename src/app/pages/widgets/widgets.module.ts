import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselWidgetComponent } from './components/carousel-widget/carousel-widget.component';
import { FormsModule } from '@angular/forms';
import { HorizontalSliderComponent } from './components/horizontal-slider/horizontal-slider.component';
import { TopSellerWidgetComponent } from './components/top-seller-widget/top-seller-widget.component';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';
import { CategorySellerWidgetComponent } from './components/category-seller-widget/category-seller-widget.component';
import { NearbyItemComponent } from './components/nearby-item/nearby-item.component';
import { PopularBrandsComponent } from './components/popular-brands/popular-brands.component';
import { SubCategoriesWidgetComponent } from './components/sub-categories-widget/sub-categories-widget.component';

@NgModule({
  declarations: [
    CarouselWidgetComponent,
    HorizontalSliderComponent,
    TopSellerWidgetComponent,
    CategorySellerWidgetComponent,
    NearbyItemComponent,
    PopularBrandsComponent,
    SubCategoriesWidgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkDirectSharedModule,
  
  ],
  exports: [
    CarouselWidgetComponent,
    HorizontalSliderComponent,
    TopSellerWidgetComponent,
    CategorySellerWidgetComponent,
    NearbyItemComponent,
    PopularBrandsComponent,
    SubCategoriesWidgetComponent
  ]
})
export class WidgetsModule { }
