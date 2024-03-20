import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
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

  constructor(private _cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.itemsArray
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.itemsArray
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items)
  }

  onClearCart(): void {
    this._cartService.clearCart()
  }

  onRemoveItemFromCart(element: CartItem): void {
    this._cartService.removeItemFromCart(element)
  }

  onAddQuantity(element: CartItem): void {
    this._cartService.addToCart(element)
  }

  onRemoveQuatity(element: CartItem): void {
    this._cartService.removeQuantity(element)
  }

  onCheckOut(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.itemsArray
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51Os3OuRu7QNWcb2cn71u3YLwFKlIOBlQfVAJb0dcVWvK8Zj5MFm71A1f9rEJzJ8kUG3NG1U4rYERbWg8eFlKZhn600IgJybGmK');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

}
