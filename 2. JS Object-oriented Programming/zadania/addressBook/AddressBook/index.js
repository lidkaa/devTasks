//     // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
//     // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup

import { v4 as uuidv4 } from 'uuid';
import { filterData } from '../Utils/filterData.js';
import { Validations } from '../Utils/validation.js';

export class AddressBook {
    constructor(contacts, groups) {
        this.id = uuidv4();

        this.validateData(contacts, groups);
        this.contacts = contacts;
        this.groups = groups;
    }

    validateData(contacts, groups) {
        const paramsToValidate = [contacts, groups];

        Validations
            .isValueArrayType(paramsToValidate)
            .isValueArrayEmpty(paramsToValidate)
    }

    filterData(phrase) {
        const dataScopeToFilter = this.contacts.concat(this.groups);
        const result = filterData(dataScopeToFilter, phrase);
        return result;
    }

    addContact(contact) {
        Validations
            .isValueObjectType(contact)
            .isValueObjectEmpty(contact);

        const doesContactExist = this.contacts.some(element => element.id === contact.id);

        if (doesContactExist) throw new Error('The contact already exists');

        this.contacts.push(contact);
    }

    updateContact(contact, prop, newValue) {
        Validations
            .isValueObjectType(contact)
            .isValueObjectEmpty(contact)
        //walidacja prop i newValue w contact - czy to ok?

        const isContactExists = this.contacts.some(element => element.id === contact.id);

        if (!isContactExists) throw new Error('The contact does not exist');

        const contactId = contact.id;

        const keys = Object.keys(contact);
        const isKeyPresent = keys.includes(prop);

        // xd
        if (isKeyPresent) {
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

    //kasowanie kontaktu - także z grupy
    removeContact(contact) {
        Validations
            .isValueObjectType(contact)
            .isValueObjectEmpty(contact);

        const contactToRemoveIndex = this.contacts.findIndex(element => element.id === contact.id);

        if (contactToRemoveIndex === -1) throw new Error('The contacts does not exist');
        if (contactToRemoveIndex >= 0) this.contacts.splice(contactToRemoveIndex, 1);

        for (const group of this.groups) {
            const contactsList = group.contactsList;
            for (const contact of contactsList) {
                group.removeContact(contact);
            }
        }
    }

    // przeanalizuj co tu brakuje
    addContactToGroup(contact, group) {
        const paramsToValidate = [contact, group];

        Validations
            .isValueObjectType(paramsToValidate)
            .isValueObjectEmpty(paramsToValidate);

        for (const groupEl of this.groups) {
            if (groupEl.id === group.id) group.addContact(contact);
        }

        // zrozuemiane
    }

    removeContactFromGroup(contact, group) {
        const paramsToValidate = [contact, group];

        Validations
            .isValueObjectType(paramsToValidate)
            .isValueObjectEmpty(paramsToValidate);

        for (const groupEl of this.groups) {
            // do zmiennej
            if (groupEl.id === group.id) group.removeContact(contact);
        }
    }

    addGroup(group) {
        Validations
            .isValueObjectType(group)
            .isValueObjectEmpty(group);

        const doesGroupExist = this.groups.some(val => val.id === group.id);
        if (doesGroupExist) throw new Error('This group already exists');

        this.groups.push(group);


        const existingContactsIds = this.contacts.map(contact => contact.id)

        for (const contact of group.contactsList) {
            if (!existingContactsIds.includes(contact.id)) this.contacts.push(contact)
        }
    }

    removeGroup(group) {
        Validations
            .isValueObjectType(group)
            .isValueObjectEmpty(group);

        const groupToRemoveIndex = this.groups.findIndex(element => element.id === group.id);
        if (groupToRemoveIndex === -1) throw new Error('This group does not exist');
        if (groupToRemoveIndex >= 0) this.groups.splice(groupToRemoveIndex, 1);
    }
}