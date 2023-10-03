import { isValueArrayType, isValueArrayEmpty, isValueObjectType, isValueObjectEmpty } from '../../../utils/validation.js';

const findData = (dataToMerge) => {
    isValueArrayType([dataToMerge]);
    isValueArrayEmpty([dataToMerge]);

    for (const value of dataToMerge) {
        isValueObjectType([value]);
    }

    const data = dataToMerge.reduce((accumulator, currentValue, index) => {
        const accumulatorLength = Object.keys(accumulator).length;
        const currentValueLength = Object.keys(currentValue).length;

        if (accumulatorLength === 0) {
            for (const key in currentValue) {
                accumulator[key] = currentValue[key];
            }
            return accumulator;
        }

        return accumulator;

    }, {})

    return ['result', data];
}

const arrayOfObjects = [
    { id: 1, name: "Grzegorz", surname: "NieGrzegor12z" },
    { name: "Grzegorz", surname: "NieGrzegorz", animal: { name: "Czarny", age: 1 } },
    { id: 1, city: 'Gliwice' },
    { age: 1, color: 'Black' },
    { friends: [{ id: 1241, name: 'Adam' }] },
    { name: 'Adam', lastName: "NieAdam" }
]

console.log(findData(arrayOfObjects));
