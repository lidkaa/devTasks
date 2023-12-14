const getMyAge = (value: number | string | Date) => {

    const isDateObjectValidValue = value instanceof Date;
    const currentYear = new Date().getFullYear();
    let yearOfBirth = 0;

    if (isDateObjectValidValue) yearOfBirth = value.getFullYear();

    yearOfBirth = parseInt(value as string);

    const isYearOfBirthValid = currentYear > yearOfBirth;

    if (!isYearOfBirthValid) throw new Error('Pass the correct year of birth');

    const age = currentYear - yearOfBirth;

    return age;
}

const inputA = new Date(1990, 1, 1);
const inputB = '1990';
const inputC = 1990;

console.log(getMyAge(inputC));


