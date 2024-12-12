import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { TestComponent } from './shared/test/test.component';
import { HomeComponent } from './compoent/home/home.component';
import { ProductsComponent } from './shared/products/products.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'admin',loadChildren: () => import('../app/module/admin/admin.module').then(m => m.AdminModule)},
  {path:'test',component:TestComponent},
  {path:'product',component:ProductsComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
