import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule,NzCarouselModule, NzBreadCrumbModule,NzLayoutModule, NzMenuModule,NzCardModule 

  ],
  exports: [
    NzIconModule,NzCarouselModule, NzBreadCrumbModule,NzLayoutModule, NzMenuModule,NzCardModule  
  ]
})
export class NgZeroModule { }
