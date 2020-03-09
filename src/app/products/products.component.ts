import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPayload } from './product-payload';
import { ProductService } from '../product.service';
import { CartPayload } from '../cart/cart-payload';
import { CookieService } from 'ngx-cookie-service';
import { OrderPayload } from './order-payload';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<Array<ProductPayload>>;
  cartPayload: CartPayload;
  cardId: string
  id: string;
  orderPayload: OrderPayload;

  constructor(private productService: ProductService, 
    private cookieService: CookieService,
    private elementRef:ElementRef) { 
    this.cartPayload = {
      id: '',
      user: '',
      items: '',
      total: 0,
      paid: false
    },
    this.orderPayload = {
      productId: 0,
      cartId: '',
      add: false
    }
  }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
    
    this.cardId = this.cookieService.get('card-id');
      if(this.cardId == ''){
            console.log('id is null');
            this.productService.createNewCard(this.cartPayload).subscribe( (data:CartPayload) => {
              this.cartPayload = data;
              this.cookieService.set('card-id', this.cartPayload.id);
              this.cardId = this.cookieService.get('card-id');
            }, (err:any) => {
              console.log("error occured creating a card..");
            }) ;
      } else {
            this.productService.getCard(this.cardId).subscribe(  (data:CartPayload) => {
            this.cartPayload = data;
            if(this.cartPayload == null){
              console.log('cardPayload is null');
            }
          }, (err: any) => {
            console.log("error occured retrievieng a card..");
          } );

        }
        //this.cookieService.delete('card-id');
      }

  
      addToCard(event:any, product: ProductPayload){
         this.addSpinnerButton(event);
         this.orderPayload.productId = product.id;
         this.orderPayload.cartId = this.cardId;
         this.orderPayload.add = true;
         this.productService.addToCard(this.orderPayload).subscribe( (data:OrderPayload) => {
          this.orderPayload = data;
           console.log("add to card");
          }, (err:any) => {
          console.log("errorr adding to card..");
          }) ;
      }

      removeFromCard(event: any, product: ProductPayload){
        this.addSpinnerButton(event);
        this.orderPayload.productId = product.id;
        this.orderPayload.cartId = this.cardId;
        this.orderPayload.add = false;
        this.productService.addToCard(this.orderPayload).subscribe( (data:OrderPayload) => {
          this.orderPayload = data;
           console.log("remove from card");
          }, (err:any) => {
          console.log("errorr removing from card..");
          }) ;
     }

     addSpinnerButton(event: any){
      event.target.insertAdjacentHTML('beforeend', 
      '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>');
      setTimeout(() => {
        var buttonSpinners = document.querySelectorAll(".spinner-grow");
        var i; 
        for (i = 0; i < buttonSpinners.length; i++) {
          buttonSpinners[i].classList.add("hidden");
        }
      }, 700);
     }

}
