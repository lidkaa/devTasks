
//  wartości opcjonalne - jak rozwiązać problem z 'nieodpowiednim' typem?

type CallbackType = <T>(element: T, index?: number, array?: any[]) => any;
type MainFunctionType = <T>(array: T[], callback: CallbackType) => any;
type ReduceCallbackType = (accumulator: any[] | boolean, currentValue: any, index?: number, array?: any[]) => any;

const mapFn: MainFunctionType = (array, callback) => {
    const copiedArray = array.slice()
    const reduceCallback: ReduceCallbackType = (accumulator, currentValue, index, array) => {
        const result = callback(currentValue, index, array);
        return accumulator.concat(result);
    }
    const result = copiedArray.reduce(reduceCallback, []);
    return result;
}

const arrMap = ['a', 'b', 'c']
const reduceMap = mapFn(arrMap, (el, index) => el);
const nativeMap = arrMap.map((el, index) => el + index)

console.log(reduceMap);
console.log(nativeMap);

// ----------------------------------------------------------------------//
const filterFn: MainFunctionType = (array, callback) => {
    const reduceCallback: ReduceCallbackType = (accumulator, currentValue, index, array) => {
        const result = callback(currentValue, index, array);
        if (result) accumulator.push(currentValue);
        return accumulator;

    }
    const result = array.reduce(reduceCallback, []);
    return result;
}

const arrFilter = [2, 4, 5]
const reduceFilter = filterFn(arrFilter, (el, index) => index % 2 === 0);
const nativeFilter = arrFilter.filter((el, index) => index % 2 === 0)

console.log(reduceFilter);
console.log(nativeFilter);

// ----------------------------------------------------------------------//
const everyFn: MainFunctionType = (array, callback) => {
    const copiedArray = array.slice();
    const reduceCallback: ReduceCallbackType = (accumulator, currentValue, index, array) => {
        const resultOfCallback = callback(currentValue, index, array);
        if (!resultOfCallback) {
            copiedArray.splice(index as number);
            return false;
        }

        return accumulator;

    }
    return copiedArray.reduce(reduceCallback, true);
}

const arrEvery = [4, 3, 8];
const reduceEvery = everyFn(arrEvery, (el, index) => el % 2 === 0);
const nativeEvery = arrEvery.every((el, index) => el % 2 === 0)

console.log('reduceEvery', reduceEvery);
console.log('nativeEvery', nativeEvery);

// ----------------------------------------------------------------------//
const someFn: MainFunctionType = (array, callback) => {
    const copiedArray = array.slice();
    const reduceCallback: ReduceCallbackType = (accumulator, currentValue, index, array) => {
        const resultOfCallback = callback(currentValue, index, array);
        if (resultOfCallback) {
            copiedArray.splice(index as number);
            return true;
        }

        return accumulator;
    }
    return copiedArray.reduce(reduceCallback, false);
}

const arrSome = [6, 3, 9];
const reduceSome = someFn(arrSome, (el, index) => el % 2 === 0);
const nativeSome = arrSome.some((el, index) => el % 2 === 0)

console.log('reduceSome', reduceSome);
console.log('nativeSome', nativeSome);