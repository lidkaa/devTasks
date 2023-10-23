import { v4 as uuidv4 } from 'uuid';
// import { isValueStringType, isValueObjectType, isValueObjectEmpty } from '../../../utils/validation.js';

class Human {
    constructor() {
        this.id = uuidv4();
        this.name = '';
        this.surname = '';
        this.email = '';
        this.country = '';
        this.phoneNumber = this.generatePhoneNumber(9);
        this.age = this.generateAge(18, 85);
    }

    async getHumanData() {
        await fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(potentialHumanData => this.insertHumanDataDetails(potentialHumanData))
            .catch(err => console.error)
    }

    insertHumanDataDetails(humanData) {
        // isValueObjectType(humanData);
        // isValueObjectEmpty(humanData);

        const potentialHuman = humanData.results[0];
        // console.log('potentialHuman', potentialHuman)

        // isValueObjectType(potentialHuman);
        // isValueObjectEmpty(potentialHuman);

        this.name = potentialHuman.name.first;
        this.surname = potentialHuman.name.last;
        this.email = potentialHuman.email;
        this.country = potentialHuman.location.country;
    }

    generatePhoneNumber(digitsAmount) {
        const randomPhoneNumber = Math.floor(Math.random() * digitsAmount * 100000000);
        return randomPhoneNumber;
    }

    generateAge(min, max) {
        const randomNumberValue = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumberValue;
    }
}

const newHumanSkeleton = new Human();

const newHuman = async () => {
    return await newHumanSkeleton.getHumanData().then(() => console.log(newHumanSkeleton))
}

newHuman();


//async do prześledzenia!!!



// (async () => {
//     const humanSkeleton = new Human();
//     newHuman.getHumanData()
//         .then(() => {
//             console.log(newHuman)
//         })
// })()

// const getHuman = async () => {
//     try {
//         const newHumanSkeleton = new Human();
//         const human = await newHumanSkeleton.init();
//         console.log('human', human);
//         return human;
//     } catch (err) {
//         console.error(err);
//     }
// }