import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../../validation.js';

export class User {
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