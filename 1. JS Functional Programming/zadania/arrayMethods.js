import { isValueArrayType, isValueFunctionType } from '../../utils/validation.js'

const callbackFn = (val, index, array) => {
    console.log(val, index, array);
    return val = val + 3;
}

const callbackFn2 = (val, index, array) => {
    console.log(val, index, array);
    return val % 2 === 0;
}

const callbackFn3 = (val) => {
    return val.length === 3;
}

const arr = [1, 2, 3, 'a'];
const arr2 = [2, 4, 8, 9, 10];
const arr3 = ['one', 'two', 'three', 'four'];

const forEachFn = (arr, callback) => {
    isValueArrayType([arr]);
    isValueFunctionType([callback]);

    for (const [index, element] of arr.entries()) {
        callback(element, index, arr);
    }
}

// console.log('NATIVE forEach', arr.forEach(callbackFn))
// console.log('forEach', forEachFn(arr, callbackFn));

// -------------------------------------------

const mapFn = (arr, callback) => {
    isValueArrayType([arr]);
    isValueFunctionType([callback]);

    const mappedArr = [];

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        mappedArr.push(result);
    }

    return mappedArr;
}

// const testArr = ["1", "2", "3"]
// console.log(testArr.map((element, index, array) => {
//     console.log(element);
//     console.log(index);
//     console.log(array);
// }))


// -------------------------------------------

// console.log('NATIVE map', arr.map(callbackFn));
// console.log('map', mapFn(arr, callbackFn))


const entriesFn = (arr) => {
    isValueArrayType([arr]);

    const arrayOfEntries = [];

    for (const [index, element] of arr.entries()) {
        const elementArray = [];
        elementArray.push(index);
        elementArray.push(element);
        arrayOfEntries.push(elementArray);
    }

    return arrayOfEntries;
}

// const nativeEntries = arr.entries();
// console.log('NATIVE entries', ...nativeEntries);
// console.log('entries', entriesFn(arr));


const filterFn = (arr, callback) => {
    isValueArrayType([arr]);
    isValueFunctionType([callback]);

    const filteredElementArr = [];

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (result) filteredElementArr.push(element)
    }

    return filteredElementArr;
}

// console.log('NATIVE filter', arr2.filter(callbackFn2));
// console.log('filter', filterFn(arr2, callbackFn2));


const everyFn = (arr, callback) => {
    isValueArrayType([arr]);
    isValueFunctionType([callback]);

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (!result) return false;
    }

    return true;
};

// console.log('NATIVE every', arr2.every(callbackFn2));
// console.log('every', everyFn(arr2, callbackFn2));



const someFn = (arr, callback) => {
    isValueArrayType([arr]);
    isValueFunctionType([callback]);

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (result) return true;
    }

    return false;
};

// console.log('NATIVE some', arr2.some(callbackFn2));
// console.log('some', someFn(arr2, callbackFn2));


const reduceFn = (arr, callback, initialValue) => {
    isValueArrayType([arr]);
    isValueFunctionType([callback]);

    let accumulator = initialValue;
    if (accumulator === undefined) accumulator = arr[0];

    for (const [index, currentValue] of arr.entries()) {
        accumulator = callback(accumulator, currentValue, index);
    }

    return accumulator;
}

const reduceCallback = (accumulator, currentValue, index, arr) => {
    accumulator += currentValue;
    return accumulator;
}

const initialValue = [];
console.log('NATIVE reduce', [2, 45, 56, 77].reduce(reduceCallback, initialValue));
console.log('reduce', reduceFn([2, 45, 56, 77], reduceCallback, initialValue));
