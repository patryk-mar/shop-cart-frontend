import { CartPositionPayload } from './cartPosition-payload';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderPayload } from '../products/order-payload';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items: CartPositionPayload[];
  cartId: string;
  cartPositionPayload: CartPositionPayload;
  orderPayload: OrderPayload;
  total: number;

  constructor(private productService: ProductService, private cookieService: CookieService) { 
    this.orderPayload = {
      productId: 0,
      cartId: '',
      add: false
    }
  }

  ngOnInit() {
    this.cartId = this.cookieService.get('card-id');
    this.productService.refreshNeeded$
        .subscribe( () => {
      this.getCartItems(this.cartId);
      this.getTotal(this.cartId);
  });

  this.getCartItems(this.cartId);
  this.getTotal(this.cartId);
    
  }

  private getCartItems(id: string){
    this.productService.getCartItems(id).subscribe(
      (items: Array<CartPositionPayload>) => this.items = items
     );
  }

  private getTotal(id: string){
    this.productService.getTotal(id).subscribe(
      (total: number) => this.total = total
     );
  }

  addToCard(cartPositionPayload: CartPositionPayload){
    this.orderPayload.productId = cartPositionPayload.productId;
    this.orderPayload.cartId = this.cookieService.get('card-id');
    this.orderPayload.add = true;
    this.productService.addToCard(this.orderPayload).subscribe( (data:OrderPayload) => {
     this.orderPayload = data;
      console.log("add to card");
     }, (err:any) => {
     console.log("errorr adding to card..");
     }) ;
 }

 removeFromCard(cartPositionPayload: CartPositionPayload){
   this.orderPayload.productId = cartPositionPayload.productId;
   this.orderPayload.cartId = this.cookieService.get('card-id');
   this.orderPayload.add = false;
   this.productService.addToCard(this.orderPayload).subscribe( (data:OrderPayload) => {
     this.orderPayload = data;
      console.log("remove from card");
     }, (err:any) => {
     console.log("errorr removing from card..");
     }) ;
}

}
