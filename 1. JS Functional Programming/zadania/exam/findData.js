import { isValueArrayType, isValueArrayEmpty, isValueObjectType } from '../../../utils/validation.js';

const findData = (dataToMerge) => {
    const paramToValidate = { params: [dataToMerge], errorMessage: true };
    isValueArrayType(paramToValidate);
    isValueArrayEmpty(paramToValidate);

    for (const value of dataToMerge) {
        const paramsToValidate = { params: [value], errorMessage: true }
        isValueObjectType(paramsToValidate);
    }
    const restOfData = [];
    const data = dataToMerge.reduce((accumulator, currentValue, index) => {
        let isSingleValueEqual = false;

        for (const key in currentValue) {
            if (currentValue[key] === accumulator[key]) isSingleValueEqual = true;

            if (Array.isArray(currentValue[key])) console.log('arr', currentValue[key])
        }

        if (isSingleValueEqual) {
            for (const key in currentValue) {
                if (!accumulator.hasOwnProperty(key)) {
                    accumulator[key] = currentValue[key]
                }
            }
        } else {
            // console.log('---', dataToMerge[index])
            restOfData.push(dataToMerge[index]);
        }


        // findData(restOfData);

        return accumulator;
    })

    return data;
}

const arrayOfObjects = [
    { id: 1, name: "Grzegorz" },
    { name: "Grzegorz", surname: "NieGrzegorz", animal: { name: "Czarny", age: 1 } },
    { id: 1, city: 'Gliwice' },
    { age: 1, color: 'Black' },
    { friends: [{ id: 1241, name: 'Adam' }] },
    { name: 'Adam', lastName: "NieAdam" }
]

console.log(findData(arrayOfObjects));
