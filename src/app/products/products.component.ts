import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPayload } from './product-payload';
import { ProductService } from '../product.service';
import { CardPayload } from '../card/card-payload';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<Array<ProductPayload>>;
  //cardProduct: Observable<CardPayload>;
  cardPayload: CardPayload;
  cardId: string
  id: string;
  
  constructor(private productService: ProductService, private cookieService: CookieService) { 
    this.cardPayload = {
      id: '',
      user: '',
      items: '',
      total: 0
    }
  }

  ngOnInit(): void {
    //this.products = this.productService.getAllProducts();
    this.products = this.productService.getAllProducts();
    this.cardId = this.cookieService.get('card-id');
    console.log("This is cardId:" + this.cardId)
    //this.cardId = '1';
      if(this.cardId == ''){
            console.log('id is null');
            this.productService.createNewCard(this.cardPayload).subscribe( (data:CardPayload) => {
              this.cardPayload = data;
              this.id = this.cardPayload.id;
              this.cookieService.set('card-id', this.id);
              this.cardId = this.cookieService.get('card-id');
              
            }, (err:any) => {
              console.log("errort occured creating a card..");
            }) ;
      } else {
            this.productService.getCard(this.cardId).subscribe(  (data:CardPayload) => {
            this.cardPayload = data;
            this.id = this.cardPayload.id;
            if(this.cardPayload == null){
              console.log('cardPayload is null');

            }
          }, (err: any) => {
            console.log("errort occured retrievieng a card..");

          } );

          
        }
        //this.cookieService.delete('card-id');
      }

  

}
