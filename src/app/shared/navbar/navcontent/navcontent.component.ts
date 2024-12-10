import { Component, Input } from '@angular/core';
import { navigation } from './nav-content';

@Component({
  selector: 'app-navcontent',
  templateUrl: './navcontent.component.html',
  styleUrl: './navcontent.component.css'
})
export class NavcontentComponent {
  
  category:any;
  @Input() selectedSection:any;


  ngOnInit(){
    this.category = navigation;
  }
}
