import { isValueArrayEmpty, isValueArrayType, isValueNumberType } from '../../utils/validation.js'

const aggregateIntoChunks = (arr, min, max) => {

    isValueArrayType([arr]);
    isValueArrayEmpty([arr]);
    isValueNumberType([min, max]);

    const isScopeValid = min < max;

    if (!isScopeValid) throw new Error('MAX has to be bigger than MIN');

    const arrayLength = arr.length;
    const randomChunksLengths = [];
    let sumOfAllRandomChunksLength = 0;

    while (sumOfAllRandomChunksLength < arrayLength) {
        const randomChunkLength = Math.floor(Math.random() * (max - min + 1)) + min;
        sumOfAllRandomChunksLength += randomChunkLength;
        randomChunksLengths.push(randomChunkLength);

        if (sumOfAllRandomChunksLength > arrayLength) {
            sumOfAllRandomChunksLength = 0;
            randomChunksLengths.length = 0; // ? było let [] i = []  -- reset tablicy? //
        }
    }

    const results = [];
    const copiedArray = arr.slice();

    for (const chunkLength of randomChunksLengths) {
        const chunk = copiedArray.splice(0, chunkLength);
        results.push(chunk);
    }

    return results;
}

const alphabet = "abcdefghijklmnoprstuwxyz".split("");
const min = 4;
const max = 7;
console.log(aggregateIntoChunks(alphabet, min, max));