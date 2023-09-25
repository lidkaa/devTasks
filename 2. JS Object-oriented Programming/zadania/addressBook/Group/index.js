// Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
// Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie

import { v4 as uuidv4 } from 'uuid';
import { isValueObjectEmpty, isValueObjectType } from '../../../../utils/validation.js';

export class Group {
    // zrobmy to contasctsList opcjonalnie
    constructor(groupName, contactsList) {
        // walidacja

        this._id = uuidv4();
        this.groupName = groupName;
        this.contactsList = contactsList;
    }

    get id() {
        return this._id;
    }

    addContact(contact) {
        // arguments -> moze udaloby sie usunac ta tablice kiedy jest 1 element
        isValueObjectType([contact]);
        isValueObjectEmpty([contact]);

        const doesContactExist = this.contactsList.some(contactFromList => contactFromList.id === contact.id);

        if (doesContactExist) throw new Error('The contact already exists in this group');

        this.contactsList.push(contact);
    }

    removeContact(contact) {
        isValueObjectType([contact]);
        isValueObjectEmpty([contact]);

        // findIndex
        const doesContactExist = this.contactsList.some(contactFromList => contactFromList.id === contact.id);

        if (!doesContactExist) throw new Error('The contact does not exist in this group');

        for (const [index, val] of this.contactsList.entries()) {
            if (val['id'] === contact['id']) this.contactsList.splice(index, 1);
        }

    }

    checkContact(contact) {
        isValueObjectType([contact]);
        isValueObjectEmpty([contact]);

        return this.contactsList.some(contactFromList => contactFromList.id === contact.id);

    }
}
