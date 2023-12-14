const aggregateIntoChunks = <T>(array: T[], min: number = 4, max: number = 7) => {
    const isScopeValid = min < max;
    if (!isScopeValid) throw new Error('MAX has to be bigger than MIN');

    const arrayarrayLength = array.length;
    const randomChunksLengths: number[] = [];
    let sumOfAllRandomChunksLength = 0;

    while (sumOfAllRandomChunksLength < arrayarrayLength) {
        const randomChunkLength = Math.floor(Math.random() * (max - min + 1)) + min;
        sumOfAllRandomChunksLength += randomChunkLength;
        randomChunksLengths.push(randomChunkLength);

        if (sumOfAllRandomChunksLength > arrayarrayLength) {
            sumOfAllRandomChunksLength = 0;
            randomChunksLengths.length = 0;
        }
    }

    const copiedarrayarray = array.slice();

    const results = randomChunksLengths.reduce((accumulator: T[][], currentValue: number) => {
        const chunk: T[] = copiedarrayarray.splice(0, currentValue);
        accumulator.push(chunk);
        return accumulator;
    }, [])

    return results;
}

const alphabet = "abcdefghijklmnoprstuwxyz".split("");
const min = 4;
const max = 7;
console.log(aggregateIntoChunks(alphabet, min, max));