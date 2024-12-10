import { Component, OnInit } from '@angular/core';
import { menJeans } from '../../Data/Men/men_jeans';
import { gounsPage1 } from '../../Data/Gouns/gouns';
import { mens_kurta } from '../../Data/Men/men_kurta';
import { lehngacholiPage2 } from '../../Data/Saree/lenghaCholiPage2';
import { mensShoesPage1 } from '../../Data/shoes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  theMenJeans:any;
  theWomenGounds:any;
  theLenghaCholi:any;
  theKurta:any;
  theMenShoes:any;

  ngOnInit(){
   this.theMenJeans = menJeans.slice(0,5);
   this.theWomenGounds = gounsPage1.slice(0,5);
   this.theLenghaCholi = lehngacholiPage2.slice(0,5);
   this.theKurta = mens_kurta.slice(0,5);
   this.theMenShoes = mensShoesPage1.slice(0,5);
  }
}
