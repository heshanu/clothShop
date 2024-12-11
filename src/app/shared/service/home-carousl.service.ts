import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HomeCarouselData } from '../../Data/ homeCarouselData';
import { HomeCaroselInterface } from '../../models/homeCarosel';

@Injectable({
  providedIn: 'root'
})
export class HomeCarouslService {

  constructor() {}

  // Method to get the initial carousel data
  getCarouselData():Observable<HomeCaroselInterface[]>{
    return of(HomeCarouselData);
  }
  

}
