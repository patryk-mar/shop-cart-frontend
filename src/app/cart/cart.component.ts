import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartPayload } from './cart-payload';
import { CookieService } from 'ngx-cookie-service';
import { Router} from '@angular/router';
declare const loadStripe: any;

@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartId: string;
  cartPayload: CartPayload;
  total: number;

  openEvent() {
    loadStripe();
  }

  constructor(private productService: ProductService,
     private cookieService: CookieService,
     private router: Router) {}

  ngOnInit(): void { 
    this.cartId = this.cookieService.get('card-id');
    this.productService.getCard(this.cartId).subscribe(  (data:CartPayload) => {
      this.cartPayload = data;
      this.total = data.total;
      if(this.cartPayload.total == 0){
        console.log('nothing in the card');
        this.router.navigateByUrl('/products'); // -------- call this to prevent direct going to payByCart page
      } 
    }, (err: any) => {
      console.log("error occured retrievieng a card..");
    } );

  }
}
