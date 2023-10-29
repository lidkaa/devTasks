import { v4 as uuidv4 } from 'uuid';
import { Validation } from './validation.js';

// Ma miec: Imie, Nazwisko, uuid

class User {
    constructor({ firstName, lastName }) {

        Validation.init(firstName, lastName).throwError().isValueStringType().isValueStringNotEmpty();

        this._id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get id() {
        return this._id
    }
}


// Ma miec: Tytuł, Autora, uuid, losowe zdjęcie oraz krótki opis

class Book {
    constructor({ title = '', author = '', picture = '', description = '', copiesQuantity = 1 }) {

        Validation.init(title, author, picture, description).throwError().isValueStringType().isValueStringNotEmpty();
        Validation.init(copiesQuantity).throwError().isValueNumberType().isValueNumberBiggerThanZero();

        this._id = uuidv4();
        this.title = title;
        this.author = author;
        this.picture = picture;
        this.description = description;
        this.copiesQuantity = copiesQuantity;
    }

    get id() {
        return this._id
    }
}

class BorrowedBook {
    constructor(book) {
        this.book = book;
        this.loanPeriod = 7;
        this._borrowDate = new Date();
        this.dueReturnDate = this.calculateReturnDate(7);
    }

    get borrowDate() {
        return this._borrowDate;
    }

    calculateReturnDate(loanPeriod) {
        const returnDate = new Date(this._borrowDate);
        returnDate.setDate(returnDate.getDate() + loanPeriod);
        return returnDate;
    }
}


// Booking dostaje użytkownika w constructorze
// Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara
// Ma umożliwiać: 
// - usuwanie i dodawanie książki do listy wypożyczonych książek
// - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie - każdy dzień zwłoki to naliczenie jakiejś kary. 

class Booking {
    constructor(user, book) {
        this.user = user;
        this.borrowedBooksList = [];
        this.fineForLateReturnPerDay = 10;
        this.fineAmount = 0;
    }
}

class Library {
    constructor(usersList = [], booksList = []) {
        this.usersList = usersList;
        this.booksList = booksList;
        this.availableBooksList = [];
        this.borrowedBooksList = [];
        this.bookingsList = []
    }

    addBook(book) {
        const isBookValid = book instanceof Book;
        if (!isBookValid) throw new Error('Pass the valid book object');

        const doesBookExist = this.booksList.filter(item => item.id === book.id)

        if (doesBookExist[0]) {
            doesBookExist[0].copiesQuantity++;
            return
        }

        this.booksList.push(book);
        this.availableBooksList.push(book);
    }

    removeBook(book) {
        const isBookValid = book instanceof Book;
        if (!isBookValid) throw new Error('Pass the valid book object');

        for (const [index, item] of this.booksList.entries()) {
            if (item.id === book.id) {
                this.booksList.splice(index, 1);

                for (const [index, item] of this.availableBooks.entries()) {
                    if (item.id === book.id) {
                        this.availableBooksList.splice(index, 1);
                    }
                }

                return
            }
        }

        throw new Error('This book is not at the books\' list');
    }

    borrowBook(book, user) {
        const isBookValid = book instanceof Book;
        if (!isBookValid) throw new Error('Pass the valid book object');

        const borrowedBook = new BorrowedBook(book);
        this.borrowedBooksList.push(borrowedBook);

        const booking = new Booking(user, borrowedBook);
        this.bookingsList.push(booking);
    }

    returnBook(borrowedBook, user) {
        const isBorrowedBookValid = borrowedBook instanceof BorrowedBook;
        if (!isBorrowedBookValid) throw new Error('Pass the valid borrowedBook object')

        for (const [index, item] of this.borrowedBooksList.entries()) {
            if (item.book.id === borrowedBook.book.id) {
                this.checkDueReturnDate(borrowedBook);
                this.borrowedBooksList.splice(index, 1)
                this.availableBooks.push(borrowedBook.book);



                return;
            }
        }

        throw new Error('This book was not borrowed by this User');
    }

    prolongateReturnDate(borrowedBook, prolongateDays = 7) {
        const isBorrowedBookValid = borrowedBook instanceof BorrowedBook;
        if (!isBorrowedBookValid) throw new Error('Pass the valid borrowedBook object');

        this.checkDueReturnDate(borrowedBook);

        if (this.fineAmount) this.returnBook(borrowedBook);

        const newReturnDate = new Date(borrowedBook.dueReturnDate);
        newReturnDate.setDate(newReturnDate.getDate() + prolongateDays);
        borrowedBook.dueReturnDate = newReturnDate;
    }

    checkDueReturnDate(borroweddBook) {
        const returnDate = new Date();
        const milisecondsFromDueReturnDate = borroweddBook.dueReturnDate - returnDate;

        if (milisecondsFromDueReturnDate < 0) {
            const daysOfDelay = Math.floor(milisecondsFromDueReturnDate / (1000 * 60 * 60 * 24));
            this.calculateFine(daysOfDelay);
        }
    }

    calculateFine(daysOfDelay) {
        this.fineAmount = Math.abs(this.fineForLateReturnPerDay * daysOfDelay);
    }
    // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
    // lista wypożyczeń, lista użytkowników

    // Ma umożliwiać: 
    // - dodawanie książek do listy
    // - usuwanie książek z listy
    // - wypożyczanie książki dla usera X
    // - oddanie wypożyczania książki
}

const userData = { firstName: 'Anna', lastName: 'Kowalska' };
const user = new User(userData);

const bookData = { title: 'It', author: 'Stephen King', picture: 'https://', description: 'Scarrrry book', copiesQuantity: 7 };
const book = new Book(bookData);
const bookData2 = { title: 'He', author: 'Stephen King', picture: 'https://', description: 'Scarrrry book', copiesQuantity: 1 };
const book2 = new Book(bookData2);
const bookData3 = { title: 'She', author: 'Stephen King', picture: 'https://', description: 'Scarrrry book', copiesQuantity: 2 };
const book3 = new Book(bookData3);

const library = new Library([user], [book]);
library.addBook(book)
library.addBook(book2)
library.borrowBook(book, user);
console.log(library)