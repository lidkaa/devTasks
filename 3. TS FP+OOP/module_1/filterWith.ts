import { data } from './filterWith_Data.ts';

type ReturnValues = string | number | {} | [] | Boolean;

const filterData = <T>(dataChunk: T, phrase?: string): ReturnValues => {

    let phraseRegExp: RegExp;

    if (phrase) {
        phraseRegExp = new RegExp(phrase, 'gi');
        const typeofDataChunk = typeof dataChunk;
        if (typeofDataChunk === 'string') {
            if (phraseRegExp.test(dataChunk as string)) return true;
        }
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

const filterWith = <T>(data: T[], phrase: string): T[] => {
    const isPhraseLongEnough = phrase.length > 2
    if (!isPhraseLongEnough) return [];


    const result = data.filter(dataPart => {
        for (const val in dataPart) {
            const dataChunk = dataPart[val];
            if (filterData(dataChunk, phrase)) return true;
        }
    })

    return result;
}

const dataToFilter = data;
console.log(filterWith(dataToFilter, 'GORGANIC'));