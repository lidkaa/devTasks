import { isValueArrayEmpty, isValueArrayType, isValueStringEmpty, isValueStringType } from '../../utils/validation.js'

const findPhraseInArray = (arr, phrase) => {

    isValueArrayType([arr]);
    isValueArrayEmpty([arr]);
    isValueStringType([phrase, ...arr]);
    isValueStringEmpty([phrase, ...arr]);

    const results = [];
    const regexp = new RegExp(phrase, 'gi');

    for (const [index, word] of arr.entries()) {
        const matchedWord = word.match(regexp);

        if (matchedWord) {
            const result = [index, word]
            results.push(result);
        }

    };

    return results;
}

const inputData = ["stwórz", "sobie", "tutaj", "więcej", "wyrazów", "TUTAJ", "GAMA", "mama", "taMa", "fama", "lama", "tutututtu"];
console.log(findPhraseInArray(inputData, "ut"));

