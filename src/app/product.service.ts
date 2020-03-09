import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProductPayload } from './products/product-payload';
import { CookieService } from 'ngx-cookie-service';
import { CartPayload } from './cart/cart-payload';
import { OrderPayload } from './products/order-payload';
import { CartPositionPayload } from './shopping-cart/cartPosition-payload';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartId: string;
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }
  private _refreshNeeded$ = new Subject<void>();
  url = 'https://shopping-cart-maryn.herokuapp.com';
  //url = 'http://localhost:8080';

   get refreshNeeded$(){
    return this._refreshNeeded$;  
   }

  // ProductController endpoints
  getAllProducts(): Observable<Array<ProductPayload>>{
    return this.httpClient.get<Array<ProductPayload>>(this.url + '/api/products/all');
  }

  // CartController endpoints
  getCartItems(permaLink: string): Observable<Array<CartPositionPayload>>{
    return this.httpClient
    .post<Array<CartPositionPayload>>(this.url + '/api/cart/all/' + permaLink, {});
  }

  getTotal(permaLink: string):Observable<number>{
    return this.httpClient.post<number>(this.url + '/api/cart/total/' + permaLink, {});
  }

  addToCard(orderPayload: OrderPayload): Observable<OrderPayload>{
    return this.httpClient.post<OrderPayload> (this.url + '/api/cart/add-to-cart', orderPayload)
    .pipe(
      tap(() => { 
         this._refreshNeeded$.next();
      })
    );
  }

  getCard(permaLink: string): Observable<CartPayload>{
    this.cartId = this.cookieService.get('card-id');
    return this.httpClient.post<CartPayload> (this.url + '/api/cart/cart/' + permaLink, {});
  }

  createNewCard(cartPayload: CartPayload): Observable<CartPayload>{
    return this.httpClient.post<CartPayload> (this.url + '/api/cart/create-cart', cartPayload);
  }

  updateUser(cartPayload: CartPayload): Observable<any> {
    return this.httpClient.post(this.url + '/create-customer', cartPayload);
  } 

  updateCartStatus(cartPayload: CartPayload): Observable<any> {
    return this.httpClient.post(this.url + '/api/cart/update-cart-status', cartPayload);
  }

}
