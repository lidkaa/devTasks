import { User } from '../User/index.js';
import { Validator } from '../Validator/index.js';

export class App {
    constructor() {
        if (App.exists) return App.instance;

        App.exists = true;
        App.instance = this;
        this.usersList = [];
        this.loggedUserRole = [];

        return this;
    }

    // init(admin) {
    //     if (!(admin instanceof User)) throw new Error('Pass valid User object');
    //     if (admin.role !== 'admin') throw new Error('Admin Role demanded');
    //     this.usersList.push(admin);
    // }

    login(email, password) {
        Validator.init(email).throwError().isValueValidEmailFormat();
        Validator.init(password).throwError().isPasswordValid();
        const user = this.usersList.find(item => item.email === email);
        const isPasswordValid = user.password === password;
        if (isPasswordValid) this.loggedUserRole = user.role;
        return this
    }
    // //addUser//tylko dodanie do listy
    //     createUser(userData) {
    //         if (!this.loggedUserRole || this.loggedUserRole === 'user') throw new Error('Operation avaiable only for Users with admin role');
    //         Validator.init(userData).throwError().isValueObjectType().isValueObjectNotEmpty();
    //         const newUser = new User(userData); //validation in User class
    //         this.usersList.push(newUser);
    //         this.loggedUserRole = null;
    //     }

    //do usera!///
    updateUserData(userEmail, propertyKey, newValue) {
        if (!this.loggedUserRole || this.loggedUserRole === 'user') throw new Error('Operation avaiable only for Users with admin role');
        Validator.init(userEmail).throwError().isValueValidEmailFormat();
        Validator.init(propertyKey, newValue).throwError().isValueStringType().isValueStringNotEmpty();

        const user = this.usersList.find(item => item.email === userEmail);
        if (!user) throw new Error('This user does not exist');

        const listOfKeys = Object.keys(user);
        const isKeyValid = listOfKeys.find(item => item === propertyKey);
        if (!isKeyValid) throw new Error('The property does not exist');

        const isPropertyKeyPassword = propertyKey === 'password';
        if (isPropertyKeyPassword) user.password = newValue;

        const isPropertyKeySex = propertyKey === 'sex';
        if (isPropertyKeySex) Validator.init(newValue).throwError().isSexOptionValid();

        const isPropertyKeyRole = propertyKey === 'role';
        if (isPropertyKeyRole) Validator.init(newValue).throwError().isRoleValid();

        const isPropertyKeyBirthDate = propertyKey === 'birthDate';
        if (isPropertyKeyBirthDate) Validator.init(newValue).throwError().isDateValid();

        user.propertyKey === newValue;

        this.loggedUserRole = null
    }
    // deleteUser(userEmail) {
    //     if (!this.loggedUserRole || this.loggedUserRole === 'user') throw new Error('Operation avaiable only for Users with admin role');
    //     const userToDelete = this.usersList.find(item => item.email === userEmail);
    //     const isUserToDeleteAdmin = userToDelete.role === 'admin';
    //     if (isUserToDeleteAdmin) throw new Error('Forbidden action - a user to delete has admin role');
    //     this.usersList.splice(this.usersList.findIndex(item => item.email === userEmail), 1);
    // }


    //sam user może sobie pozmieniać; //admin tylko userowi //

    //pdf - Michał Miszczyszyn 
}

