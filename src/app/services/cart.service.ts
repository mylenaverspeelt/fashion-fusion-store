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

    const itemInCart = itemsArray.find((_item) => item.id === item.id)

    if(itemInCart){
      itemInCart.quantity +=1
    }else{
      itemsArray.push(item)
    }

    this.cart.next({itemsArray})
    this._snackBar.open('1 item adicionaod ao carrinho', 'Ok', {duration: 3000})

    console.log(this.cart.value)
  }
}
