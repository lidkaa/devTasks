import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../../validation.js';

export class Book {
    constructor({ title = '', author = '', picture = '', description = '' }) {

        Validation.init(title, author, picture, description).throwError().isValueStringType().isValueStringNotEmpty();

        this._id = uuidv4();
        this.title = title;
        this.author = author;
        this.picture = picture;
        this.description = description;
    }

    get id() {
        return this._id
    }
}