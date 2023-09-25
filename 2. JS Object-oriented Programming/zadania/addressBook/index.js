import { Contact } from "./Contact/index.js";
import { Group } from "./Group/index.js";
import { AddressBook } from "./AddressBook/index.js";

const contact01 = new Contact('Maaa', 'L', 'ddd@ll.com', new Date());
const contact02 = new Contact('ssssM', 'dssdsdL', 'ddddffffddd@ll.com', new Date());
const contact03 = new Contact('Wee', 'ewL', 'fdf@ds.com', new Date());

const group01 = new Group('Group01', [contact03, contact02]);
const group02 = new Group('Group02', [contact01, contact02]);
const group03 = new Group('Group03', [contact01, contact03]);
const ab = new AddressBook([contact02, contact03], [group01, group02, group03]);


// contact01.update('firstname', 'Julianna');
// contact01.update('mail', 'gfg@ooioi.pl');
// // console.log(contact01)

// group01.addContact(contact01);
// // console.log(group01);
// group01.removeContact(contact01);
// // console.log(group01);
// // console.log(group01.checkContact(contact02));

const filter = ab.filterData('dss');
console.log(filter);

// ab.addContact(contact01);
// // console.log(ab.contacts);

// ab.addContactToGroup(contact01, group01);
// // console.log(ab.groups[0]);
// ab.removeContactFromGroup(contact01, group01);
// // console.log(ab.groups[0]);
// ab.updateContact(contact01, 'firstname', 'Blablalalala');
// ab.removeContact(contact01);
// console.log(ab.contacts);

// ab.removeGroup(group01);
// console.log(ab.groups);
// ab.addGroup(group01);
// console.log(ab.groups);