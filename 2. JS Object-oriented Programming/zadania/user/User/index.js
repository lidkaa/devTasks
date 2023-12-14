import { v4 as uuidv4 } from 'uuid';
import { Validator } from '../Validator/index.js';

export class User {
    constructor(userData) {
        Validator.init(userData.firstName, userData.lastName, userData.birthDate).throwError().isValueStringType().isValueStringNotEmpty();
        Validator.init(userData.sex).throwError().isValueStringType().isValueStringNotEmpty().isSexOptionValid();
        Validator.init(userData.email).throwError().isValueValidEmailFormat();
        Validator.init(userData.password).throwError().isPasswordValid();
        Validator.init(userData.role).throwError().isRoleValid();
        
        //validations - [...] / passwd, sex, role...
        this._id = uuidv4();
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.birthDate = unifyDateFormat(userData.birthDate);
        this.sex = userData.sex;
        this.email = userData.email;
        this.password = userData.password;
        this.role = userData.role;
    }

    get id() {
        return this._id;
    }
}

//update usera!
//utils
// regexp

//US, CAN // ?
function unifyDateFormat(date) {

    const dateSeparatorDot = date.split('.');
    if (dateSeparatorDot.length > 1) {
        date = date.replaceAll('.', '/')
    }

    const dateSeparatorDash = date.split('-');
    if (dateSeparatorDash.length > 1) {
        date = date.replaceAll('-', '/')
    }

    const dateSeparatorSpace = date.split(' ');
    if (dateSeparatorSpace.length > 1) {
        date = date.replaceAll(' ', '/')
    }

    return date;
}
