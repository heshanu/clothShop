import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NavcontentComponent } from './shared/navbar/navcontent/navcontent.component';
import { MatModule } from './shared/matModule';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { TestComponent } from './shared/test/test.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './compoent/home/home.component';
import { CarouslComponent } from './shared/carousl/carousl.component';
import { NgZeroModule } from './shared/ngZeroModule';
import { ProductCaroselComponent } from './shared/product-carosel/product-carosel.component';
import { AdminModule } from './module/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    NavcontentComponent,
    NotfoundComponent,
    TestComponent,
    HomeComponent,
    CarouslComponent,
    ProductCaroselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatModule,
    SlickCarouselModule,
    NgZeroModule,
    AdminModule 
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
