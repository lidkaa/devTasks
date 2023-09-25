// Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
// Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email

import { v4 as uuidv4 } from 'uuid';
import { isValueStringEmpty, isValueStringType, isValueValidEmailFormat } from '../../../../utils/validation.js'

export class Contact {

    // zastosowac object przy wiecej niz 3 argumentach
    constructor(firstname, lastname, mail, age) {
        // brak walidacji

        const creationDate = new Date()

        this._id = uuidv4();
        this._creationDate = creationDate;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age
        this.mail = mail;
        this.modificationDate = creationDate;
    }

    get creationDate() {
        return this._creationDate;
    }

    get id() {
        return this._id;
    }

    getProperty(seekedKey) { // id // creationDate
        const availableKeysToGet = []

        const keys = Object.keys()

        const foundKey = keys.find(key => seekedKey === key)

        return this[key]
    }

    update(key, newValue) {
        const keys = Object.keys(this);
        const isKeyPresent = keys.includes(key);

        if (!isKeyPresent) return;

        const paramsToValidate = [key, newValue];

        isValueStringType(paramsToValidate)
        isValueStringEmpty(paramsToValidate);

        if (key === 'mail') {
            const isMailValid = isValueValidEmailFormat(newValue);
            if (isMailValid) this.mail = newValue;
        } else this[key] = newValue;

        this.modificationDate = new Date();
    }
}
