export class Validations {

    // static value = undefined


    static isValueNumberType(...args) {
        this._isValueNumberType = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = typeof value === 'number';
                if (!result && printErrorMessage) throw new Error('The value must be a number type');
                if (!result) this._isValueNumberType = false;
            }
        } else {
            const result = typeof dataToValidate === 'number';
            if (!result && printErrorMessage) throw new Error('The value must be a number type');
            if (!result) this._isValueNumberType = false;
        }
        return this;
    }

    // static singleValue = 56
    // static multiValue = [56, 262]

    // static test() {
    //     this.TESTisValueNumberType()
    // }

    // static isValueNumberType(value, options) {

    // value - single
    // value - arr



    static isValueNumberType(...args) {
        this._isValueNumberType = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = typeof value === 'number';
                if (!result && printErrorMessage) throw new Error('The value must be a number type');
                if (!result) this._isValueNumberType = false;
            }

            return this;
        }

        // KOLEJNEGO IFA ZROBIC


        const result = typeof dataToValidate === 'number';
        if (!result && printErrorMessage) throw new Error('The value must be a number type');
        if (!result) this._isValueNumberType = false;

        return this;
    }

    static isValueNumberBiggerThanZero(...args) {
        this._isValueNumberBiggerThanZero = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = value > 0;
                if (!result && printErrorMessage) throw new Error('The value should be bigger than 0');
                if (!result) this._isValueNumberIsBiggerThanZero = false;
            }
        } else {
            const result = dataToValidate > 0;
            if (!result && printErrorMessage) throw new Error('The value should be bigger than 0');
            if (!result) this._isValueNumberBiggerThanZero = false;
        }

        return this;
    }

    static isValuePositiveNumber(...args) {
        this._isValuePositiveNumber = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;
        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = value >= 0;
                if (!result && printErrorMessage) throw new Error('The value should be positive number');
                if (!result) return this._isValuePositiveNumber = false;
            }
        } else {
            const result = dataToValidate >= 0;
            if (!result && printErrorMessage) throw new Error('The value should be positive number');
            if (!result) return this._isValuePositiveNumber = false;
        }

        return this;
    }

    static isValueStringType(...args) {
        this._isValueStringType = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = typeof value === 'string';
                if (!result && printErrorMessage) throw new Error('The value must be a string type');
                if (!result) this._isValueStringType = false;
            }
        } else {
            const result = typeof dataToValidate === 'string';
            if (!result && printErrorMessage) throw new Error('The value must be a string type');
            if (!result) this._isValueStringType = false;
        }
        return this;
    }

    static isValueStringEmpty(...args) {
        this._isValueStringEmpty = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = value.length > 0;
                if (!result && printErrorMessage) throw new Error('The value should not be an empty string');
                if (!result) return this._isValueStringEmpty;
            }
        } else {
            const result = dataToValidate.length > 0;
            if (!result && printErrorMessage) throw new Error('The value should not be an empty string');
            if (!result) return this._isValueStringEmpty;
        }
        return this;
    }


    //pojedynczy argument - tablica tablic - co w takim przypadku
    static isValueArrayType(...args) {
        this._isValueArrayType = true;

        const dataToValidate = args[0];
        const isMoreThanOneValue = dataToValidate.every(value => Array.isArray(value));

        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;


        if (Array.isArray(dataToValidate) && isMoreThanOneValue) {
            for (const value of dataToValidate) {
                const result = Array.isArray(value);
                if (!result && printErrorMessage) throw new Error('The value must be an array');
                if (!result) return this._isValueArrayType = false;
            }
        } else {
            const result = Array.isArray(dataToValidate);
            if (!result && printErrorMessage) throw new Error('The value must be an array');
            if (!result) return this._isValueArrayType = false;
        }

        return this;
    }

    static isValueArrayEmpty(...args) {
        this._isValueArrayEmpty = true;

        const dataToValidate = args[0];
        const isMoreThanOneValue = dataToValidate.every(value => Array.isArray(value));

        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate) && isMoreThanOneValue) {
            for (const value of dataToValidate) {
                const result = value.length > 0;
                if (!result && printErrorMessage) throw new Error('The value should not be an empty array');
                if (!result) return this._isValueArrayEmpty = false;
            }
        } else {
            const result = dataToValidate.length > 0;
            if (!result && printErrorMessage) throw new Error('The value must be an array');
            if (!result) return this._isValueArrayEmpty = false;
        }

        return this;
    }

    static isValueObjectType(...args) {
        this._isValueObjectType = true;
        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate) && dataToValidate.length) {
            for (const value of dataToValidate) {

                const result = Object.prototype.toString.call(value) === '[object Object]';
                if (!result && printErrorMessage) throw new Error('The value must be an object');
                if (!result) this._isValueObjectType = false;
            }
        } else {
            const result = Object.prototype.toString.call(dataToValidate) === '[object Object]';
            if (!result && printErrorMessage) throw new Error('The value must be an object');
            if (!result) this._isValueObjectType = false;;
        }


        return this;
    }

    static isValueObjectEmpty(...args) {
        this._isValueObjectEmpty = false;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;
        if (Array.isArray(dataToValidate) && dataToValidate.length) {
            for (const value of dataToValidate) {
                const result = Object.keys(value).length > 0;
                if (!result && printErrorMessage) throw new Error('The value should not be an empty object');
                if (!result) this._isValueObjectEmpty = true;
            }
        } else {
            const result = Object.keys(dataToValidate).length > 0;
            if (!result && printErrorMessage) throw new Error('The value should not be an empty object');
            if (!result) this._isValueObjectEmpty = false;
        }


        return this;
    }

    static isValueFunctionType(...args) {
        this._isValueFunctionType = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = typeof value === 'function';
                if (!result && printErrorMessage) throw new Error('The value have to be a function');
                if (!result) this._isValueFunctionType = false;
            }
        } else {
            const result = typeof dataToValidate === 'function';
            if (!result && printErrorMessage) throw new Error('The value have to be a function');
            if (!result) this._isValueFunctionType = false;
        }

        return this;
    }

    static isValueValidEmailFormat(...args) {
        this._isValueValidEmailFormat = true;

        const dataToValidate = args[0];
        const printErrorMessage = args[1] ? args[1].printErrorMessage : true;

        const mailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const mailRegExpObj = new RegExp(mailRegExp, 'gi');
        if (Array.isArray(dataToValidate)) {
            for (const value of dataToValidate) {
                const result = mailRegExpObj.test(value);
                if (!result && printErrorMessage) throw new Error('Pass the valid mail format');
                if (!result) this._isValueValidEmailFormat = false;
            }
        } else {
            const result = mailRegExpObj.test(dataToValidate);
            if (!result && printErrorMessage) throw new Error('Pass the valid mail format');
            if (!result) this._isValueValidEmailFormat = false;
        }

        return this;
    }

}
