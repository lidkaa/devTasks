import { User } from './User/index.js';
import { Book } from './Book/index.js';
import { Library } from './Library/index.js';

const userData = { firstName: 'Anna', lastName: 'Kowalska' };
const user = new User(userData);

const userData1 = { firstName: 'Manna', lastName: 'Nowak' };
const user1 = new User(userData1);


const bookData = { title: 'It', author: 'Stephen King', picture: 'https://', description: 'Scarrrry book' };
const book = new Book(bookData);
const bookData2 = { title: 'He', author: 'Stephen King', picture: 'https://', description: 'Scarrrry book' };
const book2 = new Book(bookData2);
const bookData3 = { title: 'She', author: 'Stephen King', picture: 'https://', description: 'Scarrrry book' };
const book3 = new Book(bookData3);
const library = new Library();
library.addUser(user);
library.addUser(user1);

library.addBook(book);
library.addBook(book2);
library.addBook(book3);

library.borrowBook(book, user);
library.updateUser(user, 'lastName', 'Smith');
library.returnBook(book);
library.borrowBook(book3, user);
library.borrowBook(book2, user);
