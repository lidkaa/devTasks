import { isValueStringType, isValueNumberType } from '../../../../utils/validation.js';

const filter = (dataChunk, phraseString) => {

    const phraseRegExp = new RegExp(phraseString, 'gi');

    if (phraseRegExp.test(dataChunk)) {
        return true;
    }

    if (Array.isArray(dataChunk)) {
        for (const chunk of dataChunk) {
            if (filter(chunk, phraseString)) return true;
        }
    }

    if (Object.prototype.toString.call(dataChunk) === '[object Object]') {
        for (const val in dataChunk) {
            const chunk = dataChunk[val];

            const result = filter(chunk, phraseString);
            if (result) return true;
        }
    }

    return false
}


export const filterData = (data, phrase) => {
    const isPhraseString = isValueStringType([phrase], { printErrorMessage: false });
    const isPhraseNumber = isValueNumberType([phrase], { printErrorMessage: false });

    if (!isPhraseString && !isPhraseNumber) throw new Error('Pass proper phrase type: string or number');

    const phraseString = phrase.toString();

    const isPhraseLongEnough = phraseString.length > 2
    if (!isPhraseLongEnough) return [];

    const dataToFilter = [];

    for (const val in data) {
        dataToFilter.push(...data[val]);
    }

    const result = dataToFilter.filter(dataPart => {
        for (const val in dataPart) {
            const dataChunk = dataPart[val];

            if (filter(dataChunk, phraseString)) return true;
        }
    })

    return result;
}
