import { data } from './filterWith_Data.ts';

const filterData = <T>(dataChunk: T, phraseString: string | undefined = undefined): any => {

    const phraseRegExp: RegExp = new RegExp(phraseString as string, 'gi');   //as string ?

    const typeofDataChunk = typeof dataChunk;

    if (typeofDataChunk === 'string') {
        if (phraseRegExp.test(dataChunk as string)) return true;
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


const filterWith = <T>(data: T[], phrase: string): any => {
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

const dataToFilter = data;
console.log(filterWith(dataToFilter, 'Luann Randall'));