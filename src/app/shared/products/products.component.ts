import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filtersData,singleFilter} from './filterData';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import {menJeans} from '../../Data/Men/men_jeans';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  filterData!:any;
  singleFilterData!:any;
  subscription!:Subscription;

  fillterDataIfNull = [{
    "image": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/y/g/34-jeans-bt008-laheja-original-imagqqbsfgmdhcvn.jpeg?q=70",
    "brand": "LAHEJA",
    "title": "Men Regular Mid Rise Black Jeans",
    "color": "black",
    "discountedPrice": 599,
    "price": 1999,
    "discountPersent": 70 ,
    "size": [
        {
          "name": "S",
          "quantity": 20
        },
        {
          "name": "M",
          "quantity": 30
        },
        {
          "name": "L",
          "quantity": 50
        }
      ],
      "quantity": 100,
      "topLavelCategory": "Men",
      "secondLavelCategory": "Clothing",
      "thirdLavelCategory": "men_jeans",
      "description":"A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
},
{
    "image": "https://rukminim1.flixcart.com/image/612/612/kmns7m80/jean/9/5/o/36-black-36-coper-buck-original-imagfg9edbsneu2s.jpeg?q=70",
    "brand": "COPER BUCK",
    "title": "Men Regular Mid Rise Black Jeans",
    "color": "black",
    "discountedPrice": 898,
    "price": 2399,
    "discountPersent": 62 ,
    "size": [
        {
          "name": "S",
          "quantity": 20
        },
        {
          "name": "M",
          "quantity": 30
        },
        {
          "name": "L",
          "quantity": 50
        }
      ],
      "quantity": 100,
      "topLavelCategory": "Men",
      "secondLavelCategory": "Clothing",
      "thirdLavelCategory": "men_jeans",
      "description":"A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
},];

  filteredData:any[]=[...this.fillterDataIfNull];

  categoryFilter='';

  isChecked = false;

  selectedProduct!:any[];

  constructor(private activatedRoute:ActivatedRoute, private router:Router,
    private productService:ProductService){}

  ngOnInit(){
    this.filterData = filtersData;
    this.singleFilterData = singleFilter;
    this.subscription=this.productService.getProducts()
       .subscribe((res)=>this.filteredData=res.slice(0,10));
    this.findAttributes();
  }

  handleMultipleSelectFilter(value:string, sectionId:string){
    const queryParams = {...this.activatedRoute.snapshot.queryParams};

    const filterValues = queryParams[sectionId]
    ?queryParams[sectionId].split(",")
    :[];


    const valueIndex = filterValues.indexOf(value);

    if(valueIndex != -1){
       filterValues.splice(valueIndex,1);
    }
    else{
       filterValues.push(value);
    }

    if(filterValues.length>0){
      queryParams[sectionId]= filterValues.join(",")
    }
    else{
      delete queryParams[sectionId];
    }
    console.log(value);
    this.filterProductsByColor(value);  
    this.router.navigate([],{queryParams})
  }


  handleSingleSelectFilter(vlaue:string, sectionId:string){
    const queryParams = {...this.activatedRoute.snapshot.queryParams};
    queryParams[sectionId] = vlaue;
    console.log(queryParams);
    this.router.navigate([],{queryParams})
  }
  

  extractFilterData(item:string) {
  this.filteredData = this.filteredData.filter((i:any)=> {
    if (this.categoryFilter.length === 0) {
      return true;
    }
    console.log(this.categoryFilter);
    
    return this.categoryFilter=item;
  });
  }

  public findAttributes():void {
    this.activatedRoute.queryParamMap.subscribe((params:any) => {
      const color = params.get('color');
      const size=params.get("size");
      console.log('Color query parameter:', color);
      console.log('Size query parameter:', size);
      if(color!=null){
      this.filterProductsByColor(color);
      }else{
        this.refreshList();
      }
    });
    
  }

  filterProductsByColor(color: any): void {
    if (color) {
      this.filteredData= this.filteredData.filter((product:any) => product.color === color);
      console.log(this.selectedProduct);
      
    } else {
      this.filteredData = [...this.filteredData];
    }
  }



  refreshList():void{
    this.filteredData=[...menJeans].slice(0,5);
  }
}