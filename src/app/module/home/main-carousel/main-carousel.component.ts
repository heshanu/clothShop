import { Component } from '@angular/core';
import { HomeCarouselData } from '../../../Data/ homeCarouselData';


@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css'
})
export class MainCarouselComponent {
  carouselData:any;
  currentSlide=0;
  interval:any;


  ngOnInit(){
    this.carouselData = HomeCarouselData;
    this.autoPlay();
  }

  autoPlay(){
    setInterval(() =>{
     this.nextSlide();
    },2000)
  }


  nextSlide(){
    this.currentSlide = (this.currentSlide +1) % this.carouselData.length
  }

}
