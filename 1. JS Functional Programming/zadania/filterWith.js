import { isValueStringType, isValueNumberType, isValueArrayType, isValueObjectType } from '../../utils/validation.js';
import data from './filterWith_Data.js';


const filterWith = (data, phrase) => {
    const dataArrayToValidate = { params: [data], errorMessage: true };
    isValueArrayType(dataArrayToValidate);

    const phraseToValidate = { params: [phrase], errorMessage: false };
    const isPhraseString = isValueStringType(phraseToValidate);
    const isPhraseNumber = isValueNumberType(phraseToValidate);

    const isPhraseCorrectType = isPhraseString || isPhraseNumber;
    if (!isPhraseCorrectType) throw new Error('Pass proper phrase type: string or number');

    const isPhraseLongEnough = phrase.toString().length > 2
    if (!isPhraseLongEnough) return [];

    const phraseRegExp = new RegExp(phrase, 'gi');

    const result = data.filter((dataPart, index, data) => {

        for (const val in dataPart) {

            const dataChunk = dataPart[val];

            // to dziala wtedy kiedy value -> string
            // to dziala tylko i wylacznie kiedy jst STRING
            if (phraseRegExp.test(dataChunk)) return true;

            // to dziala tylko i wylacznie kiedy jest ARRAY
            if (Array.isArray(dataChunk)) {

                for (const chunk of dataChunk) {

                    if (phraseRegExp.test(chunk)) return true;

                    if (typeof chunk === 'object') {
                        const filterResultArray = filterWith(dataChunk, phrase);
                        if (filterResultArray.length > 0) return true;
                    }
                }
            }
        }
    })

    return result;
}

const dataToFilter = data.data;
console.log(filterWith(dataToFilter, '100'));

