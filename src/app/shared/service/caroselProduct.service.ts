import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {gounsPage} from '../../Data/Gouns/gouns';

@Injectable({
  providedIn: 'root'
})
export class CaroselProductService {

  constructor() { }

  getProductList():Observable<any>{
    return of(gounsPage);
  }
}
