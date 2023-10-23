import { isValueNumberType, isValueNumberIsBiggerThanZero } from '../../validation.js'

const isRectangularTriangle = (...sides) => {
    // walidacja

    for (const side of sides) {
        isValueNumberType(side);
        isValueNumberIsBiggerThanZero(side);
    }

    const sortedSides = sides.sort();
    const [a, b, c] = sortedSides;

    const isRectangularityConditionTrue = Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2);

    return isRectangularityConditionTrue;

}

console.log(isRectangularTriangle(3, 4, 5));

