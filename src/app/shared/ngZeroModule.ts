import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule,NzCarouselModule 
  ],
  exports: [
    NzIconModule,NzCarouselModule 
  ]
})
export class NgZeroModule { }
