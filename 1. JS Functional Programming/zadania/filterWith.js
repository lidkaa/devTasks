import { isValueStringType, isValueNumberType, isValueArrayType } from '../../utils/validation.js';
import data from './filterWith_Data.js';

const filterData = (dataChunk, phraseString) => {

    const phraseRegExp = new RegExp(phraseString, 'gi');

    if (phraseRegExp.test(dataChunk)) {
        return true;
    }

    if (Array.isArray(dataChunk)) {
        for (const chunk of dataChunk) {
            if (filterData(chunk)) return true;
        }
    }

    if (Object.prototype.toString.call(dataChunk) === '[object Object]') {
        for (const val in dataChunk) {
            const chunk = dataChunk[val];

            const result = filterData(chunk)

            if (result) return true;
        }
    }

    return false
}


const filterWith = (data, phrase) => {
    isValueArrayType([data]);

    const isPhraseString = isValueStringType([phrase], { printErrorMessage: false });
    const isPhraseNumber = isValueNumberType([phrase], { printErrorMessage: false });

    if (!isPhraseString && !isPhraseNumber) throw new Error('Pass proper phrase type: string or number');

    const phraseString = phrase.toString();

    const isPhraseLongEnough = phraseString.length > 2
    if (!isPhraseLongEnough) return [];


    const result = data.filter(dataPart => {
        for (const val in dataPart) {
            const dataChunk = dataPart[val];
            if (filterData(dataChunk, phraseString)) return true;
        }
    })

    return result;
}

const dataToFilter = data.data;
console.log(filterWith(dataToFilter, 'Luann Randall'));