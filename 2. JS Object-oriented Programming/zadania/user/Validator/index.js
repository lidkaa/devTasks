import { Validation } from "../../validation.js";

export class Validator extends Validation {
    constructor(value) {
        super(value);
    }

    static isPasswordValid() {
        const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const condition = value => {
            const passwordRegExpObj = new RegExp(passwordRegEx);
            return passwordRegExpObj.test(value);
        }

        this.validate(condition);
        if (!this.result && this.shouldThrowError) throw new Error('Pass the valid password format');
        return this;
    }

    static isSexOptionValid() {
        const options = ['male', 'female'];
        const condition = value => {
            value = value.toLowerCase();
            for (const option of options) if (option === value) return value;
            return false;
        }

        this.validate(condition);
        if (!this.result && this.shouldThrowError) throw new Error('Pass the valid sex option - male or female');
        return this;
    }

    static isRoleValid() {
        const condition = value => {
            value = value.toLowerCase();
            return value === 'user' || value === 'admin';
        }

        this.validate(condition);
        if (!this.result && this.shouldThrowError) throw new Error('Pass the valid role option - regular or admin');
        return this;
    }
}