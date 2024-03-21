import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cart = new BehaviorSubject<Cart>({ itemsArray: [] })

  constructor(private _snackBar: MatSnackBar) {

  }

  addToCart(item: CartItem): void {
    const itemsArray = [...this.cart.value.itemsArray]

    const itemInCartIndex = itemsArray.findIndex((_item) => _item.id === item.id);

    if (itemInCartIndex !== -1) {
      itemsArray[itemInCartIndex].quantity += 1;
    } else {
      itemsArray.push(item);
    }

    this.cart.next({ itemsArray })
    this._snackBar.open('1 item adicionado ao carrinho', 'Ok', { duration: 3000 })

  }
  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity).reduce((prev, current) => prev + current, 0)
  }

  clearCart(): void {
    this.cart.next({ itemsArray: [] })
    this._snackBar.open('O carrinho está vazio', 'Ok', { duration: 3000 })
  }

  removeItemFromCart(element: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.itemsArray.filter((_item) => _item.id !== element.id)

    if (update) {
      this.cart.next({ itemsArray: filteredItems })
      this._snackBar.open("1 item removido do carrinho", 'Ok', { duration: 3000 })
    }
    return filteredItems
  }

  removeQuantity(element: CartItem): void {
    let itemForRemoval: CartItem | undefined
    let filteredItems = this.cart.value.itemsArray.map((_item) => {
      if (_item.id == element.id) {
        _item.quantity--

        if (_item.quantity === 0) {
          itemForRemoval = _item
        }
      }
      return _item
    }
    )

    if (itemForRemoval) {
      filteredItems = this.removeItemFromCart(itemForRemoval, false)
    }

    this.cart.next({ itemsArray: filteredItems })

    this._snackBar.open('1 item removido do carrinho', 'Ok', { duration: 3000 })
  }
}
