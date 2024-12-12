import { Injectable } from '@angular/core';
import { Observable,of} from 'rxjs';
import {menJeans} from '../../Data/Men/men_jeans';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // Method to get the initial carousel data
  getProducts():Observable<any[]>{
    return of(menJeans);
  }
}
