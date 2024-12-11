import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {gounsPage} from '../../Data/Gouns/gouns';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaroselProductService {

  getProductList():Observable<any>{
    return of(gounsPage.slice(0,2));
  }
}
