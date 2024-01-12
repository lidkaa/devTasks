const generateArrayWithRandomNumbers = (howManyNumbers: number, min: number, max: number): number[] => {
    const isScopeValid = min < max;

    if (!isScopeValid) throw new Error('MAX has to be bigger than MIN');

    const arrayWithRandomNumbers: number[] = new Array(howManyNumbers);

    for (const index of arrayWithRandomNumbers.keys()) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        arrayWithRandomNumbers[index] = randomNumber;
    }

    return arrayWithRandomNumbers;
}

const generateArrayOfArrays = (howManyArrays: number, howManyNumbers: number, min: number, max: number): number[][] => {
    const arrayOfRandomArrays: number[][] = [];
    let numbersOfArrays: number = howManyArrays;

    while (numbersOfArrays > 0) {
        const randomArray = generateArrayWithRandomNumbers(howManyNumbers, min, max);
        arrayOfRandomArrays.push(randomArray);
        numbersOfArrays--;
    }

    return arrayOfRandomArrays;
}

console.log(generateArrayOfArrays(10, 10, 1, 10));