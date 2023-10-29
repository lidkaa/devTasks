export class Validation {
    static init(...value) {
        this.shouldThrowError = false;
        this.result = true;

        if (value) {
            this.value = value;
            return this;
        }

        throw new Error('Pass a value to validate');
    }

    static throwError() {
        this.shouldThrowError = true;
        return this;
    }

    static validate(condition) {
        for (const item of this.value) {
            const isItemValid = condition(item);
            if (!isItemValid) {
                this.result = false;
                return;
            }
        }
    }

    static isValueNumberType() {

        const condition = value => typeof value === 'number';
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value must be a number type');

        return this;
    }

    static isValueNumberBiggerThanZero() {
        const condition = value => value > 0;
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value should be bigger than 0');

        return this;
    }

    static isValuePositiveNumber() {
        const condition = value => value >= 0;
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value should be positive number');

        return this;
    }

    static isValueStringType() {
        const condition = value => typeof value === 'string';
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value must be a string type');

        return this;
    }

    static isValueStringNotEmpty() {
        const condition = value => value.length > 0;
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value should not be an empty string');

        return this;
    }

    static isValueArrayType() {
        const condition = value => Array.isArray(value);
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value must be an array');

        return this;
    }

    static isValueArrayNotEmpty() {
        const condition = value => value.length > 0;
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value should not be an empty array');

        return this;
    }

    static isValueObjectType() {
        const condition = value => Object.prototype.toString.call(value) === '[object Object]';
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value must be an object');

        return this;

    }

    static isValueObjectNotEmpty() {
        const condition = value => Object.keys(value).length > 0;
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value should not be an empty object');

        return this;
    }

    static isValueFunctionType() {
        const condition = value => typeof value === 'function';
        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('The value have to be a function');

        return this;
    }

    static isValueValidEmailFormat() {
        const mailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        function condition(value) {
            const mailRegExpObj = new RegExp(mailRegExp, 'gi');
            return mailRegExpObj.test(value);
        }

        this.validate(condition);

        if (!this.result && this.shouldThrowError) throw new Error('Pass the valid mail format');

        return this;
    }
}
