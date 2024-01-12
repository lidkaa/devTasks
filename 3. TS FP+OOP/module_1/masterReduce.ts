type CallbackT<C> = (currentValue: C, index: number, array?: C[]) => any; /////////////////jak się pozbyć tego any?
type BooleanCallbackT<C> = (currentValue: C, index: number, array?: C[]) => Boolean;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const numbers = [1, 2, 3, 4, 5]
const transformed = numbers.reduce((accumulator, currentValue) => { return accumulator.toString() }, "")

function mapFn<T>(array: T[], callback: CallbackT<T>): T[] {
    const copiedArray = array.slice()

    const result = copiedArray.reduce<T[]>((accumulator, currentValue, index, array) => {
        const modyifiedElement = callback(currentValue, index, array);

        return accumulator.concat(modyifiedElement)
    }, []);

    return result;
}

const myTransfomedByMap = mapFn(numbers, (value) => value.toString())   // powinno - string []
const transfomedByTraditionalMap = numbers.map(value => value.toString())

const arrMap = [{}, {}, {}]
const reduceMap = mapFn(arrMap, (el, index) => index);  //////////////////////index is possibly undefined???
const nativeMap = arrMap.map((el, index) => el)

console.log(reduceMap);
console.log(nativeMap);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ----------------------------------------------------------------------//

function filterFn<T>(array: T[], callback: BooleanCallbackT<T>): T[] {

    const result = array.reduce<T[]>((accumulator, currentValue, index, array) => {
        const result = callback(currentValue, index, array);
        if (result) accumulator.push(currentValue);
        return accumulator;
    }, []);

    return result;
}

const arrFilter = [2, 4, 5]
const reduceFilter = filterFn(arrFilter, (el, index) => el % 2 === 0);  ///////////index?
const nativeFilter = arrFilter.filter((el, index) => index % 2 === 0)

console.log(reduceFilter);
console.log(nativeFilter);

// ----------------------------------------------------------------------//

function everyFn<T>(array: T[], callback: BooleanCallbackT<T>) {

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

const arrEvery = [4, 4, 8];
const reduceEvery = everyFn(arrEvery, (el, index) => el % 2 === 0);
const nativeEvery = arrEvery.every((el, index) => el % 2 === 0)

console.log('reduceEvery', reduceEvery);
console.log('nativeEvery', nativeEvery);

// ----------------------------------------------------------------------//

function someFn<T>(array: T[], callback: BooleanCallbackT<T>) {

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