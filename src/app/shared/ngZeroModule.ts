import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule,NzCarouselModule, NzBreadCrumbModule,NzLayoutModule, NzMenuModule 

  ],
  exports: [
    NzIconModule,NzCarouselModule, NzBreadCrumbModule,NzLayoutModule, NzMenuModule  
  ]
})
export class NgZeroModule { }
