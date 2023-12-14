import { Validation } from '../../validation.js';
import { User } from '../User/index.js';
import { Book } from '../Book/index.js';
import { Booking } from '../Booking/index.js';
import { messages } from '../messages.js'

export class Library {
    constructor() {
        if (Library.exists) return Library.instance;

        this.usersList = [];
        this.booksList = [];
        this.availableBooksList = [];
        this.borrowedBooksList = [];
        this.bookingsList = [];
        Library.exists = true;
        Library.instance = this;

        return this;
    }

    addUser(user) {
        const isUserValid = user instanceof User;
        if (!isUserValid) throw new Error(messages.userDataError);

        const foundUser = this.usersList.find(item => item.id === user.id)
        if (foundUser) throw new Error(messages.userExists);

        this.usersList.push(user);
    }

    updateUser(user, key, newValue) {

        // czy users.length === 0

        Validation.init(key, newValue).isValueStringType().isValueStringNotEmpty();

        const isUserValid = user instanceof User;
        if (!isUserValid) throw new Error(messages.userDataError);

        //do usera
        if (key === 'id') throw new Error(messages.userIdChangeAttempt);
        if (!(key in user)) throw new Error(messages.wrongValueToUpdate);

        const userToUpdate = this.usersList.find(item => item.id === user.id);
        userToUpdate[key] = newValue;
    }

    removeUser(user) {
        // czy users.length === 0

        const isUserValid = user instanceof User;
        if (!isUserValid) throw new Error(userDataError);

        const foundUser = this.usersList.find(item => item.id === user.id)
        if (!foundUser) throw new Error(messages.userDoNotExist);

        for (const item of this.bookingsList) {
            //do zmuiennej
            if (item.user.id === user.id) throw new Error(messages.userHasBookings);
        }

        this.usersList.splice(this.usersList.findIndex(item => item.id === user.id), 1)
    }

    addBook(book) {
        const isBookValid = book instanceof Book;
        if (!isBookValid) throw new Error(messages.bookDataError);

        const foundBook = this.booksList.find(item => item.id === book.id)
        if (foundBook) throw new Error(messages.bookExists);

        this.booksList.push(book);
        this.availableBooksList.push(book);
    }

    // nie usuwaj wypozyczonych / sprawdzaj
    removeBook(book) {
        const isBookValid = book instanceof Book;
        if (!isBookValid) throw new Error(messages.bookDataError);

        for (const [index, item] of this.booksList.entries()) {
            if (item.id === book.id) {
                this.booksList.splice(index, 1);
                this.availableBooksList.splice(this.availableBooksList.findIndex(item => item.id === book.id), 1);
                return
            }
        }

        throw new Error(this.messages.bookDoesNotExist);
    }

    borrowBook(book, user) {
        const isBookValid = book instanceof Book;
        if (!isBookValid) throw new Error(messages.bookDataError);
        const isUserValid = user instanceof User;
        if (!isUserValid) throw new Error(messages.userDataError);

        const isBookAvailable = this.availableBooksList.find(item => book.id === item.id);
        if (!isBookAvailable) throw new Error(messages.bookIsNotAvailable);

        const booking = new Booking(user, book);

        this.availableBooksList.splice(this.availableBooksList.findIndex(item => item.id === book.id), 1);

        this.borrowedBooksList.push(book);
        this.bookingsList.push(booking);
    }

    returnBook(book) {
        const isBookValid = book instanceof Book;
        if (!isBookValid) throw new Error(messages.bookDataError);

        for (const [index, item] of this.bookingsList.entries()) {
            if (item.book.id === book.id) {
                const isFineToPay = item.returnBook();
                //console.warning()
                if (isFineToPay) throw new Error(`The fine to pay is ${this.isFineToPay}`);
                this.borrowedBooksList.splice(this.borrowedBooksList.findIndex(item => item.id === book.id), 1)
                this.availableBooksList.push(book);
                this.bookingsList.splice(index, 1);

                return;
            }
        }

        throw new Error(this.messages.bookWasNotBorrowed);
    }
}