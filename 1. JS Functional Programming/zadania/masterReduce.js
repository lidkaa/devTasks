import { isValueArrayType, isValueFunctionType } from '../../utils/validation.js'

const validateParams = (arr, callback) => {
    const arrParamToValid = { params: [arr], errorMessage: true }
    const fnParamToValid = { params: [callback], errorMessage: true }

    if (arr) isValueArrayType(arrParamToValid);
    if (callback) isValueFunctionType(fnParamToValid);
}

//-----------------------------------------------//

const callbackMapFn = (accumulator, currentValue) => {
    accumulator.push(currentValue / 2);
    return accumulator;
}

const callbackFilterFn = (accumulator, currentValue) => {
    if (currentValue > 2) accumulator.push(currentValue);
    return accumulator;
}

const callbackEveryFn = (accumulator, currentValue) => {
    if (!accumulator) return false;
    return currentValue === 4;
}

const callbackSomeFn = (accumulator, currentValue) => {
    if (accumulator) return true;
    return currentValue > 1;
}

//----------------------------------------------//

function mapFn(arr, callback) {
    validateParams(arr, callback)

    const result = arr.reduce(callback, []);
    return result;
}

const arry = ['a', 'b', 'c']
const q = mapFn(arry, (el, index) => undefined)
const w = arry.map((el, index) => undefined)

console.log(q);
console.log(w);

function filterFn(arr, callback) {
    validateParams(arr, callback)

    const result = arr.reduce(callback, []);
    return result;
}

function everyFn(arr, callback) {
    validateParams(arr, callback)

    const result = arr.reduce(callback);
    if (!result) return false;
    return true;
}

function someFn(arr, callback) {
    validateParams(arr, callback)

    const result = arr.reduce(callback, false);
    return result;
}

const arr = [4, 2, 3, 4];

console.log('mapFn', mapFn(arr, callbackMapFn));
console.log('filterFn', filterFn(arr, callbackFilterFn));
console.log('everyFn', everyFn(arr, callbackEveryFn));
console.log('someFn', someFn(arr, callbackSomeFn));
