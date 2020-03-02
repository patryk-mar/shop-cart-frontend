import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPayload } from './products/product-payload';
import { CookieService } from 'ngx-cookie-service';
import { CardPayload } from './card/card-payload';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cardId: string;
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }


  getAllProducts(): Observable<Array<ProductPayload>>{

    console.log("This is session ID " + this.cardId);
    //return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/posts/all');
    return this.httpClient.get<Array<ProductPayload>>('https://chat-maryn-demo.herokuapp.com/api/products/all');
  }

  createNewCard(cardPayload: CardPayload): Observable<CardPayload>{
    return this.httpClient.post<CardPayload> ('https://chat-maryn-demo.herokuapp.com/api/products/create-card', cardPayload);
  }

  getCard(permaLink: string): Observable<CardPayload>{
    this.cardId = this.cookieService.get('card-id');
    console.log("getCard executed ");
    //sthis.cardId = 1;
    return this.httpClient.get<CardPayload> ('https://chat-maryn-demo.herokuapp.com/api/products/card/' + permaLink);
  }

  



}
