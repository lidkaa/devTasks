// Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
// Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email

import { v4 as uuidv4 } from 'uuid';
import { Validations } from '../Utils/validation.js'

export class Contact {

    constructor(contactData) {
        // brak walidacji
        this._init(contactData)


        const creationDate = new Date();

        this._id = uuidv4();
        this._creationDate = creationDate;
        this.modificationDate = creationDate;
        this.firstname = null
        this.lastname = null
        this.mail = null
        this.age = null
    }

    get creationDate() {
        return this._creationDate;
    }

    get id() {
        return this._id;
    }

    _init(data) {
        this.validateData(data)

        const { firstname,
            lastname,
            mail,
            age
        } = data

        this.firstname = firstname
        this.lastname = lastname
        this.mail = mail
        this.age = age
    }

    validateData(data) {
        Validations.isValueStringType([data.firstname, data.lastname])
            .isValueStringEmpty([data.firstname, data.lastname])
            .isValueValidEmailFormat(data.mail)
            .isValueNumberType(data.age)
            .isValueNumberBiggerThanZero(data.age);

        // -----------------------------------------------
        // Validation.toCheck(value1).isValueStringType().isValueStringEmpty()
        // // -----------------------------------------------
        // Validation.toCheck(value2).isValueStringType().isValueStringEmpty()
        // // -----------------------------------------------
        // Validation.toCheck(value3).isValueStringType().isValueStringEmpty().isValueValidEmailFormat()
        // // -----------------------------------------------
        // Validation.toCheck(numericValue).isValidNumber()
        // -----------------------------------------------
    }

    update(key, newValue) {
        const keys = Object.keys(this);
        const isKeyPresent = keys.includes(key);

        if (!isKeyPresent) return;

        Validations
            .isValueStringType(key)
            .isValueStringEmpty(key);

        if (key === 'age') {
            Validations
                .isValueNumberType(newValue)
                .isValueNumberBiggerThanZero(newValue);
        }
        if (key === 'phone') {
            Validations
                .isValueNumberType(newValue)
                .isValueNumberBiggerThanZero(newValue);
        }

        if (typeof newValue === 'string') {

            Validations
                .isValueStringType(newValue)
                .isValueStringEmpty(newValue);

            if (key === 'mail') Validations.isValueValidEmailFormat(newValue);

        }

        this[key] = newValue;
        this.modificationDate = new Date();
    }
}
