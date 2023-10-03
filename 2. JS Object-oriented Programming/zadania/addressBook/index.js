import { Contact } from "./Contact/index.js";
import { Group } from "./Group/index.js";
import { AddressBook } from "./AddressBook/index.js";

const contactData01 = {
    firstname: 'Anna',
    lastname: 'Kowalska',
    age: 12,
    mail: 'anna@gg.pl',
}

const contactData02 = {
    firstname: 'Jan',
    lastname: 'Kowalski',
    age: 22,
    mail: 'jan@gg.pl',
}

const contactData03 = {
    firstname: 'Adam',
    lastname: 'Smith',
    age: 32,
    mail: 'adam@gg.pl',
}

const contactData04 = {
    firstname: 'John',
    lastname: 'Brown',
    age: 42,
    mail: 'jb@gg.pl',
}


const c1 = new Contact(contactData01);
const c2 = new Contact(contactData02);
const c3 = new Contact(contactData03);
const c4 = new Contact(contactData04);

const g1 = new Group('Group01', [c1, c2]);
const g2 = new Group('Group02', [c2, c3]);
const g3 = new Group('Group03', [c1, c3, c4]);

const ab = new AddressBook([c1, c2, c3], [g1, g2]);


