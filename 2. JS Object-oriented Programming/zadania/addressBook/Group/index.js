// Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
// Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie

import { v4 as uuidv4 } from 'uuid';
import { Validations } from '../Utils/validation.js';

export class Group {
    constructor(groupName, contactsList = []) {
        this.validateData(groupName, contactsList);

        this._id = uuidv4();
        this.groupName = groupName;
        this.contactsList = contactsList;
    }

    get id() {
        return this._id;
    }

    validateData(groupName, contactsList) {
        Validations
            .isValueStringType(groupName)
            .isValueStringEmpty(groupName)
            .isValueArrayType(contactsList);
    }

    addContact(contact) {
        Validations
            .isValueObjectType(contact)
            .isValueObjectEmpty(contact);


        const doesContactExist = this.contactsList.some(contactFromList => contactFromList.id === contact.id);

        if (doesContactExist) throw new Error('The contact already exists in this group');

        this.contactsList.push(contact);
    }

    removeContact(contact) {
        Validations
            .isValueObjectType(contact)
            .isValueObjectEmpty(contact);

        const contactToRemoveIndex = this.contactsList.findIndex(contactFromList => contactFromList.id === contact.id);
        const isIndexPositive = contactToRemoveIndex >= 0
        if (!isIndexPositive) throw new Error('The contact does not exist in this group');

        this.contactsList.splice(contactToRemoveIndex, 1);
    }

    checkContact(contact) {
        Validations
            .isValueObjectType(contact)
            .isValueObjectEmpty(contact);

        return this.contactsList.some(contactFromList => contactFromList.id === contact.id);
    }
}
