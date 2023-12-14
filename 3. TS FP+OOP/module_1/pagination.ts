const paginateArray = (data: number[], settings: { actualPageIndex: number, entriesOnPage: number }) => {
    const { actualPageIndex, entriesOnPage } = settings;
    const itemsAmount = data.length;
    const isEntriesNumberCorrect = entriesOnPage <= itemsAmount;

    if (!isEntriesNumberCorrect) throw new Error(`Wrong entries number. Pick the entries' number from a scope 1 to ${itemsAmount}`);

    const numberOfPages = Math.ceil(itemsAmount / entriesOnPage);
    const isPageIndexCorrect = numberOfPages > actualPageIndex;

    if (!isPageIndexCorrect) {
        const maxPageValue = numberOfPages - 1
        throw new Error(`Wrong page index. Pick the page index from a scope 0 to ${maxPageValue}`);
    }

    const indexOfFirstShownElement = actualPageIndex * entriesOnPage;
    const indexOfLastShownElement = indexOfFirstShownElement + entriesOnPage;
    const entriesOnSelectedPage = data.slice(indexOfFirstShownElement, indexOfLastShownElement);

    return entriesOnSelectedPage;
};

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const settings = {
    actualPageIndex: 1,
    entriesOnPage: 5
};

const data2 = new Array(100).fill('').map((_, index) => index + 1)
const settings2 = {
    actualPageIndex: 0,
    entriesOnPage: 50
};

// console.log(paginateArray(data, settings));
console.log(paginateArray(data2, settings2));
