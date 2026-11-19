import { Component } from '@angular/core';

interface Product {
  name: string;
  category: string;
  price: string;
  color?: string;
  shape?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly products: Product[] = [
    { name: 'The Weekend Knit', category: 'SOFT COTTON · SAND', price: '$68', color: 'sand', shape: 'knit' },
    { name: 'Everyday Overshirt', category: 'RELAXED FIT · OLIVE', price: '$84', color: 'olive', shape: 'shirt' },
    { name: 'City Tote', category: 'RECYCLED CANVAS · INK', price: '$42', color: 'ink', shape: 'tote' }
  ];
}
