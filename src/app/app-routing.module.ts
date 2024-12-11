import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { TestComponent } from './shared/test/test.component';
import { HomeComponent } from './compoent/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'test',component:TestComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
