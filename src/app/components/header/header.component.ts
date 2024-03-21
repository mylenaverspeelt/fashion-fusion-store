import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  private _cart: Cart = { itemsArray: [] }
  itemsQuantity: number = 0

  @Input()

  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart
    this.itemsQuantity = cart.itemsArray.map((item) => item.quantity).reduce((prev, current) => prev + current, 0)
  }


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
 
  }

  getTotal(itemsArray: Array<CartItem>): number {
    return this.cartService.getTotal(itemsArray)
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }
}
