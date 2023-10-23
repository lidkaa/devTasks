import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../Utils/validation.js'

export class Product { 

    constructor(data) {
        // walidacja na Data -> object -> jego klucze -> i ich wartosci

        this._id = uuidv4();
        this.name = null;
        this.category = [];
        this.price = null;  // 100zl
        this.discount = null; // 20
        this.totalPrice = discountedPrice // 80zl
        this.salesPrice = price - discountedPrice // 20zl 

        this._init(data)
    }

    get id() {
        return this._id;
    }

    _init(data) {
        // zla walidacja na Category
                // brakuje limitu na discount

        const stringValidation = [data.name, data.category];
        const numberValidation = [data.price, data.discount];
        
        Validation.init(stringValidation, {isValueSingle: false}).isValueStringType().isValueStringNotEmpty();
        Validation.init(numberValidation, {isValueSingle: false}).isValueNumberType().isValuePositiveNumber();

        this.name = data.name;
        this.category.push(data.category);
        this.price = data.price;
        this.discount = data.discount; // 20
        this.totalPrice = Regular - Discount
    }

    changeName(newValue) {
        const isValueValid = Validation.init(newValue).isValueStringType().isValueStringNotEmpty().result;
        if(isValueValid) this.name = newValue;
    }

    changePrice(newValue) {
        const isValueValid = Validation.init(newValue).isValueNumberType().isValueNumberBiggerThanZero().result;
        if(isValueValid) this.price = newValue;
    }   

    changeDiscount(newValue) {
        // brakuje limitu na discount
        const isValueValid = Validation.init(newValue).isValueNumberType().isValueNumberBiggerThanZero().result;
        if(isValueValid) this.discount = newValue;

    }

    calculatePriceWithDiscount() {
        return this.price - this.price * this.discount * 0.01;
    }   

    addToCategory(newCategory) {
        const isValueValid = Validation.init(newCategory).isValueStringType().isValueStringNotEmpty().result;
        if(isValueValid) this.category.push(newCategory);
    }
}

    // Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, uuid
    // Ma umożliwiać: 
    // - określać jego rabat procentowy
    // - dodawać produkt do kategorii - kategorię do produktu ???
    // - zmianę nazwy, ceny lub rabatu

