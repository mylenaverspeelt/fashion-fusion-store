import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = {
    items: [{
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

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.cart.items
  }

  getTotal(items: Array<CartItem>): number {

    return items.map((item) => item.price * item.quantity).reduce((prev, current) => prev + current, 0)
  }

}
