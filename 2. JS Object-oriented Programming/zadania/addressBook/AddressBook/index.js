//     // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
//     // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup

import { filterData } from '../Utils/filterData.js';
import { isValueObjectEmpty, isValueObjectType, isValueStringEmpty, isValueStringType } from '../../../../utils/validation.js';

export class AddressBook {
    constructor(contacts, groups) {
        // id
        this.contacts = contacts;
        this.groups = groups;
    }

    filterData(phrase) {
        // this to rowniez metody i wszystkie propertiesy
        // wiec ogranicz to tylko do porzadanych elementow

        const result = filterData(this, phrase);
        return result;
    }

    addContact(contact) {
        isValueObjectType([contact]);
        isValueObjectEmpty([contact]);

        const isContactExists = this.contacts.some(element => element['id'] === contact['id']);

        if (isContactExists) throw new Error('The contact already exists');

        this.contacts.push(contact);
    }

    addContactToGroup(contact, group) {
        const paramsToValidate = [contact, group];
        isValueObjectType(paramsToValidate);
        isValueObjectEmpty(paramsToValidate);

        // nie boj sie uzywac juz napisanych metod
        for (const val of this.groups) {
            if (val['id'] === group['id']) {
                const groupContactList = group['contactsList'];
                const isContactExists = groupContactList.some(val => val['id'] === contact['id']);

                if (isContactExists) {
                    throw new Error('The contact already exists in this group')
                } else groupContactList.push(contact);

            }
        }
    }

    updateContact(contact, prop, newValue) {
        isValueObjectType([contact]);
        isValueObjectEmpty([contact]);

        const isContactExists = this.contacts.some(element => element['id'] === contact['id']);

        if (!isContactExists) throw new Error('The contact does not exist');

        const contactId = contact.id;

        const keys = Object.keys(contact);
        const isKeyPresent = keys.includes(prop);

        const paramsToValidate = [prop, newValue];
        const areParamsValid = isKeyPresent && isValueStringType(paramsToValidate) && isValueStringEmpty(paramsToValidate);

        if (areParamsValid) {
            for (const val in this) {
                const data = this[val];

                for (const el of data) {

                    if (el['id'] === contactId) el.update(prop, newValue);

                    if (el['contactsList']) {

                        for (const val of el['contactsList']) {
                            if (val['id'] === contactId) val.update(prop, newValue);
                        }

                    }
                }
            }
        }
    }

    removeContact(contact) {
        isValueObjectType([contact]);
        isValueObjectEmpty([contact]);

        const contactId = contact.id;
        const isContactExists = this.contacts.some(element => element['id'] === contact['id']);

        if (!isContactExists) throw new Error('The contacts does not exist');

        for (const val in this) {
            const data = this[val];

            for (const [index, el] of data.entries()) {

                if (el['id'] === contactId) data.splice(index, 1);

                if (el['contactsList']) {

                    for (const [index, val] of el['contactsList'].entries()) {
                        if (val['id'] === contactId) el['contactsList'].splice(index, 1);
                    }
                }
            }
        }
    }

    removeContactFromGroup(contact, group) {
        const paramsToValidate = [contact, group]
        isValueObjectType(paramsToValidate);
        isValueObjectEmpty(paramsToValidate);

        for (const [index, val] of this.groups.entries()) {
            if (val['id'] === group['id']) {
                const groupContactList = group['contactsList'];
                const isContactExists = groupContactList.some(val => val['id'] === contact['id']);

                if (!isContactExists) {
                    throw new Error('The contact does not exist in this group');
                } else groupContactList.splice(index, 1);
            }
        }
    }

    // zastanow sie
    addGroup(group) {
        isValueObjectType([group]);
        isValueObjectEmpty([group]);

        const isGroupExists = this.groups.some(val => val['id'] === group['id']);   // id ? name?

        if (isGroupExists) throw new Error('This group already exists');

        this.groups.push(group);
    }

    removeGroup(group) {
        isValueObjectType([group]);
        isValueObjectEmpty([group]);

        const isGroupExists = this.groups.some(element => element['id'] === group['id']);
        if (!isGroupExists) throw new Error('This group does not exist');

        for (const [index, val] of this.groups.entries()) {
            if (val['id'] === group['id']) this.groups.splice(index, 1);
        }

    }
}


// class Validation

// 1) roznica miedzy implementowaniem klas jako instancje a podejsciem statycznym
// 2) podejscie statyczne
// 3) chaining
