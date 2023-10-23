const defaultOptions = {
    printErrorMessage: true
}

export function isValueNumberType(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = typeof val === 'number';
        if (!result && printErrorMessage) throw new Error('The value must be a number type');
        if (!result) return false;
        return true;
    }
}

export function isValueNumberIsBiggerThanZero(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const param of parametersToValidate) {
        const result = param > 0;
        if (!result && printErrorMessage) throw new Error('The value should be bigger than 0');
        if (!result) return false;
        return true;
    }
}

export function isValueStringType(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = typeof val === 'string';

        if (!result && printErrorMessage) throw new Error('The value must be a string type');
        if (!result) return false;
        return true;
    }
}

export function isValueStringEmpty(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = val.length > 0;
        if (!result && printErrorMessage) throw new Error('The value should not be an empty string');
        if (!result) return false;
        return true;
    }
}

export function isValuePositiveNumber(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = val >= 0;
        if (!result && printErrorMessage) throw new Error('The value should be positive number');
        if (!result) return false;
    }

    return true;
}



export function isValueArrayType(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = Array.isArray(val);
        if (!result && printErrorMessage) throw new Error('The value must be an array');
        if (!result) return false;
    }

    return true;
}

export function isValueArrayEmpty(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = val.length > 0;
        if (!result && printErrorMessage) throw new Error('The value should not be an empty array');
        if (!result) return false;
    }

    return true;
}

export function isValueObjectType(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = Object.prototype.toString.call(val) === '[object Object]';
        if (!result && printErrorMessage) throw new Error('The value must be an object');
        if (!result) return false;
    }

    return true;
}

export function isValueObjectEmpty(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = Object.keys(val).length > 0;
        if (!result && printErrorMessage) throw new Error('The value should not be an empty object');
        if (!result) return false;
    }

    return true;
}

export function isValueFunctionType(values, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;

    for (const val of values) {
        const result = typeof val === 'function'
        if (!result && printErrorMessage) throw new Error('The value have to be a function');
        if (!result) return false;
    }

    return true;
}

export function isValueValidEmailFormat(value, options = defaultOptions) {
    let printErrorMessage = options.printErrorMessage;
    const mailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mailRegExpObj = new RegExp(mailRegExp, 'gi');

    const result = mailRegExpObj.test(value);

    if (!result && printErrorMessage) throw new Error('Pass the valid mail format');
    if (!result) return false;

    return true;
}
