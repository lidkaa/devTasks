import { isValueArrayType, isValueFunctionType } from '../../utils/validation.js';

function mapFn(array, callback) {
    if (array) isValueArrayType([array]);
    if (callback) isValueFunctionType([callback]);

    const copiedArray = array.slice()

    const result = copiedArray.reduce((accumulator, currentValue, index, array) => {
        const result = callback(currentValue, index, array);

        return accumulator.concat(result)

        // accumulator.push(result);

        //przerwe 

        // return accumulator;

        // sendAccumulatorToBackend(accumulator)

        // tutaj bedzie inny code ktory wyjebie apke

    }, []);

    return result;
}

const arrMap = ['a', 'b', 'c']
const reduceMap = mapFn(arrMap, (el, index) => undefined);
const nativeMap = arrMap.map((el, index) => undefined)

console.log(reduceMap);
console.log(nativeMap);

// ----------------------------------------------------------------------//
function filterFn(array, callback) {
    if (array) isValueArrayType([array]);
    if (callback) isValueFunctionType([callback]);

    const result = array.reduce((accumulator, currentValue, index, array) => {
        const result = callback(currentValue, index, array);
        if (result) accumulator.push(currentValue);
        return accumulator;
    }, []);

    return result;
}

const arrFilter = [2, 4, 5]
const reduceFilter = filterFn(arrFilter, (el, index) => index % 2 === 0);
const nativeFilter = arrFilter.filter((el, index) => index % 2 === 0)

console.log(reduceFilter);
console.log(nativeFilter);

// ----------------------------------------------------------------------//
function everyFn(array, callback) {
    if (array) isValueArrayType([array]);
    if (callback) isValueFunctionType([callback]);

    const copiedArray = array.slice();

    return copiedArray.reduce((accumulator, currentValue, index, array) => {
        const resultOfCallback = callback(currentValue, index, array);
        if (!resultOfCallback) {
            copiedArray.splice(index);
            return false;
        }

        return accumulator;

    }, true);
}

const arrEvery = [4, 3, 8];
const reduceEvery = everyFn(arrEvery, (el, index) => el % 2 === 0);
const nativeEvery = arrEvery.every((el, index) => el % 2 === 0)

console.log('reduceEvery', reduceEvery);
console.log('nativeEvery', nativeEvery);

// ----------------------------------------------------------------------//
function someFn(array, callback) {
    if (array) isValueArrayType([array]);
    if (callback) isValueFunctionType([callback]);

    const copiedArray = array.slice();

    return copiedArray.reduce((accumulator, currentValue, index, array) => {
        const resultOfCallback = callback(currentValue, index, array);
        if (resultOfCallback) {
            copiedArray.splice(index);
            return true;
        }

        return accumulator;
    }, false);

}

const arrSome = [6, 3, 9];
const reduceSome = someFn(arrSome, (el, index) => el % 2 === 0);
const nativeSome = arrSome.some((el, index) => el % 2 === 0)

console.log('reduceSome', reduceSome);
console.log('nativeSome', nativeSome);