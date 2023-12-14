import { v4 as uuidv4 } from 'uuid';

//utils

const ONE_DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

function calculateReturnDate(borrowDate, loanPeriod) {

    // brak walidacji 
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + loanPeriod);
    return returnDate;
}

export class Booking {
    constructor(user, book) {
        //brak walidacji

        this._id = uuidv4();
        this._borrowDate = new Date();
        this.user = user;
        this.book = book;
        this.loanPeriod = 7;
        this.fineForLateReturnPerDay = 10;
        this.fineAmount = 0;
        this.dueReturnDate = calculateReturnDate(this.borrowDate, this.loanPeriod);
    }

    get id() {
        return this._id;
    }

    get borrowDate() {
        return this._borrowDate;
    }

    returnBook() {
        const daysOfDelay = this.checkReturnDelay(this.dueReturnDate);
        if (daysOfDelay) {
            this.fineAmount = Math.abs(this.fineForLateReturnPerDay * daysOfDelay);
        }

        return this.fineAmount;
    }

    // nie ptorzeba tegop tutaj
    checkReturnDelay(dueReturnDate) {
        const returnDate = new Date();
        const milisecondsFromDueReturnDate = dueReturnDate - returnDate;

        // do zmiennej
        if (milisecondsFromDueReturnDate < 0) {
            const daysOfDelay = Math.floor(milisecondsFromDueReturnDate / ONE_DAY_IN_MILISECONDS);
            return daysOfDelay;
        }
    }
}
