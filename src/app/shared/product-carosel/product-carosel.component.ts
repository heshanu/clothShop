import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CaroselProductService } from '../service/caroselProduct.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-carosel',
  templateUrl: './product-carosel.component.html',
  styleUrl: './product-carosel.component.css'
})
export class ProductCaroselComponent implements OnInit,OnDestroy{

  ProductData!: any[];

  private subscription!: Subscription;

  @Input() autoplay: boolean = false;

  slides: any[] = [];
  
  currentIndex: number = 0;

  constructor(private caroselProduct:CaroselProductService){}

  ngOnInit(): void {
    this.subscription = this.caroselProduct.getProductList()
    .subscribe((res) => {
      this.slides = res;
      if (this.autoplay) {
        this.startAutoplay();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startAutoplay(): void {
    setInterval(() => {
      this.nextSlide();
    }, 100);
  }

 

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

}
