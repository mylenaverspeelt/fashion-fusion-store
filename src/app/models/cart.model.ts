export interface Cart {
    itemsArray: Array<CartItem>
}

export interface CartItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    id: number;
}