import { isValueArrayEmpty, isValueArrayType, isValueStringEmpty, isValueStringType } from '../../utils/validation.js'

const findPhraseInArray = (arr, phrase) => {

    isValueArrayType([arr]);
    isValueArrayEmpty([arr]);
    isValueStringType([phrase, ...arr]);
    isValueStringEmpty([phrase, ...arr]);

    const result = [];
    const regexp = new RegExp(phrase, 'gi');

    for (const [index, word] of arr.entries()) {
        const matchedWord = word.match(regexp);

        new RegExp().test()
        const resultWordArray = [];

        if (matchedWord) {
            resultWordArray.push(index, word);
            result.push(resultWordArray);
        }
    };

    return result;
}

const inputData = ["stwórz", "sobie", "tutaj", "więcej", "wyrazów", "TUTAJ", "GAMA", "mama", "taMa", "fama", "lama", "tutututtu"];
console.log(findPhraseInArray(inputData, "ut"));

