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

  slides: any[] = [];

  effect = 'scrollx';

  constructor(private caroselProduct:CaroselProductService){}

  ngOnInit(): void {
    this.subscription = this.caroselProduct.getProductList()
    .subscribe((res) => {
      this.slides = res
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
