import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { TestComponent } from './shared/test/test.component';

const routes: Routes = [
  {path:'home',loadChildren:()=>import("./module/home/home.module").then(m=>m.HomeModule)},
  {path:'',component:TestComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
