import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Book from '../domain/Book';
import Smartphone from '../domain/Smartphone';

describe('Cart Advanced Functionality', () => {
    const book = new Book(1, 'Book', 'Author', 500, 300);
    const movie = new Movie(
        2, 
        'Movie', 
        1000, 
        'img.jpg', 
        'Original', 
        2020, 
        'Country', 
        'Slogan', 
        ['genre'], 
        120, 
        false
    );
    const phone = new Smartphone(3, 'Phone', 30000, 'X', 'Brand');

    let cart: Cart;

    beforeEach(() => {
        cart = new Cart();
    });

    test('should handle multiplicable items', () => {
        cart.add(phone);
        cart.add(phone);
        
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].quantity).toBe(2);
        expect(cart.getTotalCost()).toBe(60000);
    });

    test('should handle unique items', () => {
        cart.add(book);
        cart.add(book);
        
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].quantity).toBe(1);
    });

    test('should decrease quantity correctly', () => {
        cart.add(phone);
        cart.add(phone);
        cart.removeItem(3);
        
        expect(cart.items[0].quantity).toBe(1);
        cart.removeItem(3);
        expect(cart.items).toHaveLength(0);
    });

    test('should remove non-multiplicable immediately', () => {
        cart.add(book);
        cart.removeItem(1);
        expect(cart.items).toHaveLength(0);
    });

    test('should handle mixed items', () => {
        cart.add(book);
        cart.add(phone);
        cart.add(phone);
        cart.add(movie);
        
        expect(cart.items).toHaveLength(3);
        expect(cart.getTotalCost()).toBe(500 + 60000 + 1000);
    });
});


describe('Cart Discount Calculations', () => {
  const book = new Book(1, 'Book', 'Author', 500, 300);
  const phone = new Smartphone(2, 'Phone', 30000, 'X', 'Brand');
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test('should apply 10% discount correctly', () => {
    cart.add(book);
    cart.add(phone);
    cart.add(phone);

    expect(cart.getTotalCostWithDiscount(0.1)).toBe((500 + 30000*2) * 0.9);
  });

  test('should handle 100% discount', () => {
    cart.add(book);
    expect(cart.getTotalCostWithDiscount(1)).toBe(0);
  });

  test('should handle 0% discount', () => {
    cart.add(phone);
    cart.add(phone);
    expect(cart.getTotalCostWithDiscount(0)).toBe(30000*2);
  });

    test('should throw error for negative discount', () => {
      expect(() => cart.getTotalCostWithDiscount(-0.1))
          .toThrow('Invalid discount value');
  });

  test('should throw error for discount over 100%', () => {
      expect(() => cart.getTotalCostWithDiscount(1.1))
          .toThrow('Invalid discount value');
  });

  test('should handle empty cart', () => {
    expect(cart.getTotalCostWithDiscount(0.5)).toBe(0);
  });

  test('should handle mixed items types', () => {
    cart.add(book);
    cart.add(phone);
    cart.add(phone);
    cart.add(new Movie(3, 'Movie', 1000, 'img.jpg', 'Movie', 2023, 'US', 'Slogan', [], 120, false));

    const expectedTotal = (500 + 30000*2 + 1000) * 0.8;
    expect(cart.getTotalCostWithDiscount(0.2)).toBe(expectedTotal);
  });

  test('should do nothing when removing non-existent item', () => {
    // Добавляем любой товар в корзину
    cart.add(new Book(1, 'Test Book', 'Author', 500, 300));
    
    // Сохраняем исходное состояние корзины
    const initialItems = [...cart.items];
    
    // Пытаемся удалить несуществующий ID
    cart.removeItem(999);
    
    // Проверяем, что корзина не изменилась
    expect(cart.items).toEqual(initialItems);
  });
});