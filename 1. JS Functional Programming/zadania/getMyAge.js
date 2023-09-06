import { isValueNumberIsBiggerThanZero, isValueNumberType, isValueStringEmpty, isValueStringType } from '../../utils/validation.js';

const getMyAge = (value) => {
    const valueToValidate = [value];
    const isDateObjectValidValue = value instanceof Date;
    const isNumberValidValue = isValueNumberType(valueToValidate, false) && isValueNumberIsBiggerThanZero(valueToValidate, false);
    const isStringValidValue = isValueStringType(valueToValidate, false) && isValueStringEmpty(valueToValidate, false);
    const isCorrectInput = isDateObjectValidValue || isStringValidValue || isNumberValidValue;

    if (!isCorrectInput) throw new Error('Wrong date format');

    const currentYear = new Date().getFullYear();
    let yearOfBirth = 0;

    if (isDateObjectValidValue) yearOfBirth = value.getFullYear();

    yearOfBirth = parseInt(value);

    const isYearOfBirthValid = currentYear > yearOfBirth;

    if (!isYearOfBirthValid) throw new Error('Pass the correct year of birth');

    const age = currentYear - yearOfBirth;

    return age;
}

const inputA = new Date(1990, 1, 1);
const inputB = '1990';
const inputC = 1990;

console.log(getMyAge(inputC));


