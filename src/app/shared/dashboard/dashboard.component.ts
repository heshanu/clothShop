import { Component, Input, signal } from '@angular/core';

interface Product {
  name: string;
  category: string;
  price: string;
  color?: string;
  shape?: string;
  url:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  readonly selectedCloth = signal<string>('/t_shirt.glb');

  readonly products: Product[] = [
    { name: 'The Weekend Knit', category: 'SOFT COTTON · SAND', price: '$68', color: 'sand', shape: 'knit',url:'/t_shirt.glb' },
    { name: 'Everyday Overshirt', category: 'RELAXED FIT · OLIVE', price: '$84', color: 'olive', shape: 'shirt',url:'/femaletr.glb' },
    { name: 'City Tote', category: 'RECYCLED CANVAS · INK', price: '$42', color: 'ink', shape: 'tote' ,url:'/shirt.glb'},
    { name: 'City Tote', category: 'RECYCLED CANVAS · INK', price: '$42', color: 'ink', shape: 'tote' ,url:'/tr2.glb'},
    { name: 'City Tote', category: 'RECYCLED CANVAS · INK', price: '$42', color: 'ink', shape: 'tote' ,url:'/tr3.glb'},
     { name: 'City Tote', category: 'RECYCLED CANVAS · INK', price: '$42', color: 'ink', shape: 'tote' ,url:'/mens_formal_blazer.glb'},
  ];


  changeCloth(nextPath: any): void {
    this.selectedCloth.set(nextPath);
  }

}
