import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = {
    itemsArray: [{
      product: 'https://via.placeholder.com/150',
      name: 'shoes',
      price: 300,
      quantity: 2,
      id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'shoes',
      price: 300,
      quantity: 1,
      id: 2
    }]
  }

  displayedColumns: Array<string> = ['product',
    'name', 'price', 'quantity', 'total', 'action']

  dataSource: Array<CartItem> = []

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cart.itemsArray
  }

  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items)
  }

}
