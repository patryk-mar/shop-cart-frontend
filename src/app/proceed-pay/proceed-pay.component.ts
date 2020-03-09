import { Component, OnInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartPayload } from '../cart/cart-payload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import $ from 'jquery';


@Component({
  selector: 'app-proceed-pay',
  templateUrl: './proceed-pay.component.html',
  styleUrls: ['./proceed-pay.component.css']
})
export class ProceedPayComponent implements OnInit {
  cartId: string;
  cartPayload: CartPayload;

  email: string;
  registerForm: FormGroup;
  formSubmitted = false;
  public errorMsg;

  constructor(private formBuilder:FormBuilder, private productService: ProductService,
    private cookieService: CookieService, private router: Router,
    private zone:NgZone) { 
      this.registerForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]]
     });
     this.cartPayload = {
      id: '',
      user: '',
      items: '',
      total: 0,
      paid: false
    };
    }

  ngOnInit(): void {
    
    this.cartId = this.cookieService.get('card-id');
    this.productService.getCard(this.cartId).subscribe(  (data:CartPayload) => {
      this.cartPayload = data;
      console.log(this.cartPayload.total);
      if(this.cartPayload.total == 0){
        console.log('nothing in the card');
        this.router.navigateByUrl('/products');                 // -------- call this t prevent direct going to pay page
      } 
    }, (err: any) => {
      console.log("errort occured retrievieng a card..");

    } );
  }

  onSubmit(){
    this.formSubmitted = true;
    this.email = this.registerForm.get('email').value;
    this.cartPayload.user = this.email;
    this.cartPayload.id = this.cartId;
    this.productService.updateUser(this.cartPayload).subscribe(data => {
      console.log("update user success");
      setTimeout(() => {
        this.router.navigateByUrl('/card', { skipLocationChange: false })
        .then(() => {
          this.router.navigate(['card']);
        });
        
      }, 2000);
      
    }, error => {
      this.errorMsg = "an error occured or incorrect email address";
      $(".alert").addClass('visible').removeClass('invisible');
      console.log("register failed");
    });
 
  }

}
