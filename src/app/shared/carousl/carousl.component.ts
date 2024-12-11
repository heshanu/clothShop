import { Component,OnInit,Input } from '@angular/core';
import { HomeCarouslService } from '../service/home-carousl.service';
import { HomeCaroselInterface } from '../../models/homeCarosel';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-carousl',
  templateUrl: './carousl.component.html',
  styleUrl: './carousl.component.css'
})
export class CarouslComponent implements OnInit{

  caroselData!: HomeCaroselInterface[];

  private subscription!: Subscription;

  @Input() autoplay: boolean = false;

  slides: HomeCaroselInterface[] = [];
  
  currentIndex: number = 0;

  constructor(private carouselService: HomeCarouslService) {}

  ngOnInit(): void {
    this.subscription = this.carouselService.getCarouselData().subscribe((res) => {
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
    }, 1000);
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
}
