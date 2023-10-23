import { isValueArrayType, isValueArrayEmpty, isValueNumberType } from '../../validation.js'

const findElement = (arr, arrToCompare, index = 0) => {
    // walidacja

    const arrToCompare = arr.splice(index);
    console.log(arrToCompare);
    for (const element of arrToCompare) {
        const areElementsEqualToEachOther = element === elementToFind
        if (areElementsEqualToEachOther) return true;
    }

    return false;
}

const includesElement = (arr, elementToFind, fromIndex) => {

    isValueArrayType(arr);
    isValueArrayEmpty(arr);
    isValueNumberType(fromIndex);


    const proszeNazywajZmienneBoPlacze = fromIndex > arr.length - 1
    if (proszeNazywajZmienneBoPlacze) return false;

    if (0 <= fromIndex && fromIndex < arr.length) return findElement(fromIndex);

    if (fromIndex < 0) {
        return findElement[0]

        // const computedIndex = arr.length + fromIndex;
        // return computedIndex <= 0 ? findElement(0) : false;
    }

    return false
}

const arr = ['one', 'two', 3, 4, 5];
console.log(includesElement(arr, 'one', 2));
console.log('fff', arr);