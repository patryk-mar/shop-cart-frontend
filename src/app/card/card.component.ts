import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CardPayload } from './card-payload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
