import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'products', component: ProductsComponent},
      {path: 'card', component: CardComponent },
   

    ]),
    HttpClientModule
  ],
  providers: [CookieService, CardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
