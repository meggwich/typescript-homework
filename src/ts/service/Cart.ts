import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    getTotalCost(): number {
        return this._items.reduce((sum, item) => sum + item.price, 0);
    }
    getTotalCostWithDiscount(discount: number): number {
        if (discount > 1 || discount < 0) {
            throw new Error('Invalid discount value. Discount must be between 0 and 1');
        }
        return this.getTotalCost() * (1 - discount);
    }

    removeItemById(id: number): void {
        const index = this._items.findIndex(item => item.id === id);
        if (index !== -1) {
            this._items.splice(index, 1);
        }
    }
}