import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeProductCardComponent } from './home-product-card/home-product-card.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeProductCardComponent,
    MainCarouselComponent,
    ProductSliderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports:[
    HomeRoutingModule,
    HomeProductCardComponent,
    MainCarouselComponent,
    ProductSliderComponent,
    HomeComponent
  ]
})
export class HomeModule { }
