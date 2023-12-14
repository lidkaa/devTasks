const findPhraseInArray = (array: string[], phrase: string) => {

    const results: (number | string)[][] = [];
    const regexp = new RegExp(phrase, 'gi');

    for (const [index, word] of array.entries()) {
        const matchedWord = word.match(regexp);

        if (matchedWord) {
            const result = [index, word]
            results.push(result);
        }

    };

    return results;
}

const inputData = ["stwórz", "sobie", "tutaj", "więcej", "wyrazów", "TUTAJ", "GAMA", "mama", "taMa", "fama", "lama", "tutututtu"];
console.log(findPhraseInArray(inputData, "ię"));

