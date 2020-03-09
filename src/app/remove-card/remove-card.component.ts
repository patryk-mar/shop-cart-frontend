import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../product.service';
import { CartPayload } from '../cart/cart-payload';

@Component({
  selector: 'app-remove-card',
  templateUrl: './remove-card.component.html',
  styleUrls: ['./remove-card.component.css']
})
export class RemoveCardComponent implements OnInit {
  cartPayload: CartPayload;

  constructor(private router: Router, 
    private cookieService: CookieService,
    private productService: ProductService) {
      this.cartPayload = {
        id: '',
        user: '',
        items: '',
        total: 0,
        paid: false
      }
    }

  ngOnInit(): void {
    this.cartPayload.id = this.cookieService.get('card-id');
    this.cartPayload.paid = true;
    this.productService.updateCartStatus(this.cartPayload).subscribe( () => {
       console.log("cart status updated");
      }, (err:any) => {
      console.log("error occured removing a card..");
      }) ;      
    this.cookieService.delete('card-id');
    this.router.navigateByUrl('/products');
  }

}
