import Buyable from '../domain/Buyable';

interface CartItem {
    item: Buyable;
    quantity: number;
}

export default class Cart {
    private _items: CartItem[] = [];

    add(item: Buyable): void {
        const existingItem = this._items.find(i => i.item.id === item.id);
        
        if (existingItem) {
            if (item.multiplicable) {
                existingItem.quantity++;
            }
        } else {
            this._items.push({ item, quantity: 1 });
        }
    }

    removeItem(id: number): void {
        const index = this._items.findIndex(i => i.item.id === id);
        if (index === -1) return;

        const cartItem = this._items[index];
        if (cartItem.item.multiplicable) {
            cartItem.quantity--;
            if (cartItem.quantity === 0) {
                this._items.splice(index, 1);
            }
        } else {
            this._items.splice(index, 1);
        }
    }

    getTotalCost(): number {
        return this._items.reduce((sum, cartItem) => 
            sum + (cartItem.item.price * cartItem.quantity), 0);
    }

    getTotalCostWithDiscount(discount: number): number {
        if (discount < 0 || discount > 1) {
            throw new Error('Invalid discount value');
        }
        return this.getTotalCost() * (1 - discount);
    }

    get items(): CartItem[] {
        return [...this._items];
    }
}


