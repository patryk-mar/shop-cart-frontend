import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RemoveCardComponent } from './remove-card/remove-card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HeaderComponent } from './header/header.component';
import { ProceedPayComponent } from './proceed-pay/proceed-pay.component';
import { InitDirective } from './init.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    RemoveCardComponent,
    ShoppingCartComponent,
    HeaderComponent,
    ProceedPayComponent,
    InitDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'products', component: ProductsComponent},
      {path: 'card', component: CartComponent },
      {path: 'remove-cart', component: RemoveCardComponent },
      {path: 'update-cart', component: ShoppingCartComponent },
      {path: 'proceed', component: ProceedPayComponent }
   
    ]),
    HttpClientModule,
  ],
  providers: [CookieService, CartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
