const qwe = ''
const asd = ''
const zxc = ''

Validation.init(qwe)
Validation.init([qwe])
Validation.init([qwe, asd, zxc]).isValueArrayNotEmpty().validateArrayValues().isStringValue()

export class Validation {
    static init(value, options) {
        this.value = value;
        this.printErrorMessage = true;
        // this.isValueSingle = true;
        this.result = true;

        const areOptionsDefined = typeof options !== 'undefined'
        if (areOptionsDefined) {
            const isPrintErrorMessagePropertyIncludedInOptions = 'printErrorMessage' in options
            const isValueSinglePropertyIncludedInOptions = 'printErrorMessage' in options

            if (isPrintErrorMessagePropertyIncludedInOptions) this.printErrorMessage = options.printErrorMessage
            if (isValueSinglePropertyIncludedInOptions) this.printErrorMessage = options.isValueSingle
        }

        return this;
    }

    static validate(condition) {
        if (this.isValueSingle) this.result = condition(this.value);

        if (!this.isValueSingle && Array.isArray(this.value)) {
            for (const item of this.value) {
                const isItemValid = condition(item);
                if (!isItemValid) this.result = false;
            }
        }

        if (!this.isValueSingle && !Array.isArray(this.value)) {

            throw new Error('Pass a proper value to validate');
        };

    }

    static isValueNumberType() {

        const condition = value => typeof value === 'number';
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value must be a number type');

        return this;
    }

    static isValueNumberBiggerThanZero() {
        const condition = value => value > 0;
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value should be bigger than 0');

        return this;
    }

    static isValuePositiveNumber() {
        const condition = value => value >= 0;
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value should be positive number');

        return this;
    }

    static isValueStringType() {
        const condition = value => typeof value === 'string';
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value must be a string type');

        return this;
    }

    static isValueStringNotEmpty() {
        const condition = value => value.length > 0;
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value should not be an empty string');

        return this;
    }

    static isValueArrayType() {
        const condition = value => Array.isArray(value);
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value must be an array');

        return this;
    }

    static isValueArrayNotEmpty() {
        const condition = value => value.length > 0;
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value should not be an empty array');

        return this;
    }

    static isValueObjectType() {
        const condition = value => Object.prototype.toString.call(value) === '[object Object]';
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value must be an object');

        return this;

    }

    static isValueObjectNotEmpty() {
        const condition = value => Object.keys(value).length > 0;
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value should not be an empty object');

        return this;
    }

    static isValueFunctionType() {
        const condition = value => typeof value === 'function';
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('The value have to be a function');

        return this;
    }

    static isValueValidEmailFormat() {
        const mailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const mailRegExpObj = new RegExp(mailRegExp, 'gi');
        const condition = value => mailRegExpObj.test(value);
        this.validate(condition);

        if (!this.result && this.printErrorMessage) throw new Error('Pass the valid mail format');

        return this;
    }

}
