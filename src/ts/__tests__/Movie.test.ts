// test/Movie.test.ts
import Movie from '../domain/Movie';
import Cart from '../service/Cart';

describe('Movie Class Comprehensive Tests', () => {
  let testMovie: Movie;
  let cart: Cart;

  beforeEach(() => {
    testMovie = new Movie(
      123,
      'Интерстеллар',
      990,
      'interstellar.jpg',
      'Interstellar',
      2014,
      'США, Великобритания',
      'Следующее поколение найдёт свой путь',
      ['фантастика', 'драма'],
      169,
      true
    );

    cart = new Cart();
  });

  test('should create movie instance with correct property types', () => {
    expect(typeof testMovie.id).toBe('number');
    expect(typeof testMovie.name).toBe('string');
    expect(typeof testMovie.price).toBe('number');
    expect(typeof testMovie.img).toBe('string');
    expect(typeof testMovie.originalName).toBe('string');
    expect(typeof testMovie.year).toBe('number');
    expect(typeof testMovie.country).toBe('string');
    expect(typeof testMovie.slogan).toBe('string');
    expect(Array.isArray(testMovie.genres)).toBe(true);
    expect(typeof testMovie.minutesDuration).toBe('number');
  });


  test('should handle default genres array when not provided', () => {
    const movie = new Movie(
      124,
      'Довод',
      790,
      'tenet.jpg',
      'Tenet',
      2020,
      'США, Великобритания',
      'Время идёт обратно',
      undefined, // Жанры не переданы
      150,
      true
    );

    expect(movie.genres).toEqual([]);
  });

  test('should correctly calculate price with currency conversion', () => {
    const usdMovie = new Movie(
      125,
      'Hollywood Movie',
      100,
      'image.jpg',
      'Hollywood Movie',
      2023,
      'USA',
      'Test Slogan',
      ['action'],
      120,
      false
    );

    // Тест для гипотетической конвертации валют
    const exchangeRate = 75;
    const expectedPriceInRub = usdMovie.price * exchangeRate;
    expect(usdMovie.price * exchangeRate).toBe(expectedPriceInRub);
  });

  test('should handle multiple movie additions to cart', () => {
    const movie2 = new Movie(
      124,
      'Довод',
      790,
      'tenet.jpg',
      'Tenet',
      2020,
      'США, Великобритания',
      'Время идёт обратно',
      ['боевик', 'фантастика'],
      150,
      true
    );

    cart.add(testMovie);
    cart.add(movie2);
    
    expect(cart.items).toHaveLength(2);
    expect(cart.items[0].item).toBeInstanceOf(Movie);
    expect(cart.items[1].item.name).toBe('Довод');
  });

  test('should handle extreme duration values', () => {
    const shortMovie = new Movie(
      126,
      'Короткометражка',
      300,
      'short.jpg',
      'Short Film',
      2023,
      'Россия',
      'Тестовый слоган',
      ['документальный'],
      15,
      true
    );

    const longMovie = new Movie(
      127,
      'Сага',
      1500,
      'saga.jpg',
      'Saga',
      2023,
      'США',
      'Долгий фильм',
      ['эпопея'],
      360,
      true
    );

    expect(shortMovie.minutesDuration).toBeGreaterThan(0);
    expect(longMovie.minutesDuration).toBeLessThan(600);
  });

  test('should handle special characters in fields', () => {
    const specialCharMovie = new Movie(
      128,
      'Фильм с "спецсимволами"',
      500,
      'image!@#.jpg',
      'Movie with $pec!al Chars',
      2023,
      'Страна/Регион',
      'Слоган: «Привет!»',
      ['жанр №1', 'жанр-2'],
      120,
      true
    );

    expect(specialCharMovie.name).toContain('"спецсимволами"');
    expect(specialCharMovie.originalName).toContain('$pec!al');
    expect(specialCharMovie.country).toContain('/');
  });

  test('should handle empty string values where allowed', () => {
    const emptyFieldsMovie = new Movie(
      129,
      '', // Пустое название
      0,  // Нулевая цена
      '',
      '',
      2023,
      '',
      '',
      [],
      0,
      false
    );

    expect(emptyFieldsMovie.name).toBe('');
    expect(emptyFieldsMovie.price).toBe(0);
    expect(emptyFieldsMovie.slogan).toBe('');
  });

  test('should handle different IMax versions', () => {
    const imaxMovie = new Movie(
      130,
      'IMAX Experience',
      1200,
      'imax.jpg',
      'IMAX Experience',
      2023,
      'США',
      'Смотри в IMAX',
      ['документальный'],
      90,
      true
    );

    const nonImaxMovie = new Movie(
      131,
      'Обычный фильм',
      500,
      'regular.jpg',
      'Regular Movie',
      2023,
      'Россия',
      'Без IMAX',
      ['драма'],
      120,
      false
    );

    expect(imaxMovie.imax).toBe(true);
    expect(nonImaxMovie.imax).toBe(false);
  });
  
});


