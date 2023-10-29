import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../validation.js';

export class Product { 
    constructor(data) {
        Validation.init(data).throwError().isValueObjectType().isValueObjectNotEmpty();
        Validation.init(data.name, data.currency, ...data.category).throwError().isValueStringType().isValueStringNotEmpty();
        Validation.init(data.price, data.discount).throwError().isValueNumberType().isValuePositiveNumber();
        Validation.init(data.category).throwError().isValueArrayType().isValueArrayNotEmpty();

        this._id = uuidv4();
        this.name = data.name;
        this.category = data.category;
        this.price = data.price;
        this.currency = data.currency; // walidacja zewn.?
        this.discountPercentage = data.discount || null;
        this.discountAmount = this.price * this.discountPercentage * 0.01;
        this.priceMinusDiscountAmount = this.price - this.discountAmount;
    }

    get id() {
        return this._id;
    }

    // THROW
    changeName(newValue) {
        const isValueValid = Validation.init(newValue).isValueStringType().isValueStringNotEmpty().result;
        if(isValueValid) this.name = newValue;
    }
    
    // THROW
    changePrice(newValue) {
        const isValueValid = Validation.init(newValue).isValueNumberType().isValueNumberBiggerThanZero().result;
        if(isValueValid) this.price = newValue;
    }   
    
    // THROW
    changeDiscount(newValue) {
        const isValueValid = Validation.init(newValue).isValueNumberType().isValueNumberBiggerThanZero().result;
        const isDiscountPercentageValid = newValue < 100;
        if(isValueValid && isDiscountPercentageValid) this.discount = newValue;

    }

    addCategory(newCategory) {
        const isValueValid = Validation.init(newCategory).isValueStringType().isValueStringNotEmpty().result;
        if(isValueValid) this.category.push(newCategory);
    }
}

    // Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, uuid
    // Ma umożliwiać: 
    // - określać jego rabat procentowy
    // - dodawać produkt do kategorii - kategorię do produktu ???
    // - zmianę nazwy, ceny lub rabatu

