import { isValueNumberIsBiggerThanZero, isValueNumberType } from '../../utils/validation.js'

const generateArrayWithRandomNumbers = (howManyNumbers, min, max) => {
    const paramsToValidate = [howManyNumbers, min, max];
    isValueNumberType(paramsToValidate);
    isValueNumberIsBiggerThanZero(paramsToValidate);

    const isScopeValid = min < max;

    if (!isScopeValid) throw new Error('MAX has to be bigger than MIN');

    const arrayWithRandomNumbers = new Array(howManyNumbers);

    // airbnb -> javascript best practices //map
    for (const index of arrayWithRandomNumbers.keys()) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        arrayWithRandomNumbers[index] = randomNumber;
    }

    return arrayWithRandomNumbers;
}

const generateArrayOfArrays = (howManyArrays, howManyNumbers, min, max) => {
    const paramsToValidate = [howManyArrays, howManyNumbers, min, max];
    isValueNumberType(paramsToValidate);
    isValueNumberIsBiggerThanZero(paramsToValidate);

    let arrayOfRandomArrays = [];
    let numbersOfArrays = howManyArrays;

    while (numbersOfArrays > 0) {
        const randomArray = generateArrayWithRandomNumbers(howManyNumbers, min, max);
        arrayOfRandomArrays.push(randomArray);
        numbersOfArrays--;
    }

    return arrayOfRandomArrays;
}

console.log(generateArrayOfArrays(10, 10, 1, 10));