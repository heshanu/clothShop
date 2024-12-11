import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdertableComponent } from './ordertable/ordertable.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminproductComponent,
    CreateproductComponent,
    CustomerComponent,DashboardComponent,OrdertableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],exports:[
    AdminproductComponent,
    CreateproductComponent,
    CustomerComponent,DashboardComponent,OrdertableComponent
  ]
})
export class AdminModule { }
