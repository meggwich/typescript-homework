import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Book from '../domain/Book';

describe('Cart functionality', () => {
    let cart: Cart;
    const testMovie = new Movie(
        1,
        'Мстители',
        1000,
        'avengers.jpg',
        'The Avengers',
        2012,
        'США',
        'Avengers Assemble!',
        ['фантастика', 'боевик'],
        143,
        false
    );
    
    const testBook = new Book(
        2,
        'Книга',
        'Автор',
        500,
        300
    );

    beforeEach(() => {
        cart = new Cart();
    });

    test('should calculate total cost correctly', () => {
        cart.add(testMovie);
        cart.add(testBook);
        
        expect(cart.getTotalCost()).toBe(1500);
    });

    test('should apply discount correctly', () => {
        cart.add(testMovie);
        cart.add(testBook);
        
        expect(cart.getTotalCostWithDiscount(0.1)).toBe(1350);
        expect(cart.getTotalCostWithDiscount(0)).toBe(1500);
        expect(cart.getTotalCostWithDiscount(1)).toBe(0);
    });

    test('should throw error for invalid discount', () => {
        expect(() => cart.getTotalCostWithDiscount(-0.1)).toThrow('Invalid discount value');
        expect(() => cart.getTotalCostWithDiscount(1.1)).toThrow('Invalid discount value');
    });

    test('should remove item by id', () => {
        cart.add(testMovie);
        cart.add(testBook);
        
        cart.removeItemById(1);
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].id).toBe(2);
    });

    test('should handle remove non-existent item', () => {
        cart.add(testMovie);
        
        cart.removeItemById(999);
        expect(cart.items).toHaveLength(1);
    });

    test('should maintain immutability of items array', () => {
        cart.add(testMovie);
        const initialItems = cart.items;
        
        cart.add(testBook);
        expect(initialItems).not.toBe(cart.items);
        expect(initialItems).toHaveLength(1);
        expect(cart.items).toHaveLength(2);
    });

    test('should handle multiple additions and removals', () => {
        cart.add(testMovie);
        cart.add(testMovie);
        cart.add(testBook);
        
        cart.removeItemById(1);
        expect(cart.items).toHaveLength(2);
        expect(cart.getTotalCost()).toBe(1000 + 500);
    });
});

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});
