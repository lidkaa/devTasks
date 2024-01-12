type ArrayType = unknown;
type ArrayMethodFunctionType = <T>(array: T[], callback: Function) => void;


const callbackFn = (value: number) => {
    return value = value + 3;
}

const callbackFn2 = (value: number) => {
    return value % 2 === 0;
}

const callbackFn3 = (value: string | ArrayType[]) => {
    return value.length === 3;
}

const arr = [1, 2, 3, 4];
const arr2 = [2, 4, 8, 9, 10];
const arr3 = ['one', 'two', 'three', 'four'];


const forEachFn: ArrayMethodFunctionType = (arr, callback) => {
    for (const [index, element] of arr.entries()) {
        callback(element, index, arr);
    }
}

console.log('NATIVE forEach', arr.forEach(callbackFn));
console.log('forEach', forEachFn(arr, callbackFn));

// -------------------------------------------

const mapFunction: ArrayMethodFunctionType = (arr, callback) => {

    const mappedArr: ArrayType[] = [];

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        mappedArr.push(result);
    }

    return mappedArr;
}

const numbers = [2, 3, 5, 6]

mapFunction(numbers, (element, index, array) => {
    return element + 1
})

// const testArr = ["1", "2", "3"]
// console.log(testArr.map((element, index, array) => {
//     console.log(element);
//     console.log(index);
//     console.log(array);
// }))


// -------------------------------------------

console.log('NATIVE map', arr.map(callbackFn));
console.log('map', mapFunction(arr, callbackFn))


const entriesFn: ArrayMethodFunctionType = arr => {
    const arrayOfEntries: ArrayType[] = [];

    for (const [index, element] of arr.entries()) {
        const elementArray: any[] = [];
        elementArray.push(index);
        elementArray.push(element);
        arrayOfEntries.push(elementArray);
    }

    return arrayOfEntries;
}

// const nativeEntries = arr.entries();
// console.log('NATIVE entries', ...nativeEntries);
// console.log('entries', entriesFn(arr));


const filterFunction: ArrayMethodFunctionType = (arr, callback) => {

    const filteredElementArr: ArrayType[] = [];

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (result) filteredElementArr.push(element)
    }

    return filteredElementArr;
}

// console.log('NATIVE filter', arr2.filter(callbackFn2));
// console.log('filter', filterFunction(arr2, callbackFn2));


const everyFunction: ArrayMethodFunctionType = (arr, callback) => {

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (!result) return false;
    }

    return true;
};

// console.log('NATIVE every', arr2.every(callbackFn2));
// console.log('every', everyFunction(arr2, callbackFn2));



const someFunction: ArrayMethodFunctionType = (arr, callback) => {

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (result) return true;
    }

    return false;
};

// console.log('NATIVE some', arr2.some(callbackFn2));
// console.log('some', someFn(arr2, callbackFn2));


// DO POPRAWY
type BaseValues = number | string | [] | {};
type RCallbackType<T> = (accumulator: T, currentValue: T, index?: number, array?: T[]) => T | BaseValues;
type ReduceFnType<T> = (array: T[], callback: RCallbackType<T>, initialValue?: T) => T;

const reduceFn: ReduceFnType<ArrayType> = (array, callback, initialValue) => {

    let accumulator = initialValue;
    if (accumulator === undefined) accumulator = array[0];

    for (const [index, currentValue] of array.entries()) {
        accumulator = callback(accumulator, currentValue, index, array);
    }

    return accumulator;
}

const reduceCallback: RCallbackType<number> = (accumulator, currentValue, index, array) => {
    console.log(index, currentValue)
    accumulator += currentValue + index;
    return accumulator;
}

console.log('NATIVE reduce', [2, 45, 56, 77].reduce(reduceCallback, []));
console.log('reduce', reduceFn([2, 45, 56, 77], reduceCallback, []));
