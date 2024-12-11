import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { OrdertableComponent } from './ordertable/ordertable.component';

const routes: Routes = [
  {path:'',component:AdminComponent},
  {path:'customer',component:CustomerComponent},
  {path:'createProduct',component:CreateproductComponent},
  {path:'orderTable',component:OrdertableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
