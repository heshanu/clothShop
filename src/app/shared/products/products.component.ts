import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filtersData,singleFilter} from './filterData';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  filterData!:any;
  singleFilterData!:any;
  menPants!:any;
  subscription!:Subscription;

  constructor(private activatedRoute:ActivatedRoute, private router:Router,
    private productService:ProductService){}

  ngOnInit(){
    this.filterData = filtersData;
    this.singleFilterData = singleFilter;
    this.subscription=this.productService.getProducts()
       .subscribe((res)=>this.menPants=res
       )
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

    this.router.navigate([],{queryParams})
  }


  handleSingleSelectFilter(vlaue:string, sectionId:string){

    const queryParams = {...this.activatedRoute.snapshot.queryParams};
    queryParams[sectionId] = vlaue;

    this.router.navigate([],{queryParams})

  }


}
