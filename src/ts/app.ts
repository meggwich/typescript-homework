import Cart from './service/Cart';
import Book from './domain/Book';
import MusicAlbum from './domain/MusicAlbum';
import Movie from './domain/Movie';




const cart = new Cart();
console.log(cart.items);

cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
cart.add(new Movie(
    1015,
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
));

console.log(cart.items);
