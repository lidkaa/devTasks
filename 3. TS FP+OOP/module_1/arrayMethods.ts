type CallbackType<T> = (value: T, index?: number, array?: T[]) => any;

const callbackFn: CallbackType<number> = (val, index, array): number => {
    return val = val + 3;
}

const callbackFn2: CallbackType<number> = (val, index, array): boolean => {
    return val % 2 === 0;
}

const callbackFn3: CallbackType<string | any[]> = val => {
    return val.length === 3;
}

const arr = [1, 2, 3, 'a'];
const arr2 = [2, 4, 8, 9, 10];
const arr3 = ['one', 'two', 'three', 'four'];


//jak to zrobić z T?
//tj. ArrayMethodType<T> = (array: T[], callback: CallbackType<T>) => any //
// type ArrayType<T> = T[];

type ArrayMethodType = (array: any[], callback: CallbackType<any>) => any;


const forEachFn: ArrayMethodType = (arr, callback) => {
    for (const [index, element] of arr.entries()) {
        callback(element, index, arr);
    }
}

// console.log('NATIVE forEach', arr.forEach(callbackFn))
// console.log('forEach', forEachFn(arr, callbackFn));

// -------------------------------------------

const mapFn: ArrayMethodType = (arr, callback) => {

    const mappedArr: any[] = [];

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


const entriesFn: ArrayMethodType = arr => {
    const arrayOfEntries: any[] = [];

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


const filterFn: ArrayMethodType = (arr, callback) => {

    const filteredElementArr: any[] = [];

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (result) filteredElementArr.push(element)
    }

    return filteredElementArr;
}

// console.log('NATIVE filter', arr2.filter(callbackFn2));
// console.log('filter', filterFn(arr2, callbackFn2));


const everyFn: ArrayMethodType = (arr, callback) => {

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (!result) return false;
    }

    return true;
};

// console.log('NATIVE every', arr2.every(callbackFn2));
// console.log('every', everyFn(arr2, callbackFn2));



const someFn: ArrayMethodType = (arr, callback) => {

    for (const [index, element] of arr.entries()) {
        const result = callback(element, index, arr);
        if (result) return true;
    }

    return false;
};

// console.log('NATIVE some', arr2.some(callbackFn2));
// console.log('some', someFn(arr2, callbackFn2));

type ReduceCallbackType = (accumulator: any, currentValue: any, index?: number, array?: any[]) => any;
type ReduceFnType = (array: any[], callback: ReduceCallbackType, initialValue?: any) => any;

const reduceFn: ReduceFnType = (array, callback, initialValue) => {

    let accumulator = initialValue;
    if (accumulator === undefined) accumulator = array[0];

    for (const [index, currentValue] of array.entries()) {
        accumulator = callback(accumulator, currentValue, index, array);
    }

    return accumulator;
}

const reduceCallback: ReduceCallbackType = (accumulator, currentValue, index, array) => {
    console.log(index, currentValue)
    accumulator += currentValue + index;
    return accumulator;
}

console.log('NATIVE reduce', [2, 45, 56, 77].reduce(reduceCallback, []));
console.log('reduce', reduceFn([2, 45, 56, 77], reduceCallback, []));
