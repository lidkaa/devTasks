import { v1 as uuid } from 'uuid';
import { Validation } from '../../../validation.ts'

// utility types

interface ProductInterface {
    readonly id: string;
    name: string;
    category: string[];
    price: number;
    currency: string;
    discountPercentage: number | null;
    discountAmount: number;
    priceMinusDiscountAmount: number;
    changeName(newValue: string): void;
    changePrice(newValue: number): void;
    changeDiscount(newValue: number): void;
    addCategory(newCategory: string): void;
}

export class Product implements ProductInterface {
    public readonly id: string;
    public name: string;
    public category: string[];
    public price: number;
    public currency: string;
    public discountPercentage: number;
    public discountAmount: number;
    public priceMinusDiscountAmount: number;

    constructor(data: any) {
        Validation.init(data).throwError().isValueObjectNotEmpty();
        Validation.init(data.name, data.currency, ...data.category).throwError().isValueStringNotEmpty();
        Validation.init(data.price, data.discount).throwError().isValuePositiveNumber();
        Validation.init(data.category).throwError().isValueArrayNotEmpty();

        this.id = uuid();
        this.name = data.name;
        this.category = data.category;
        this.price = data.price;
        this.currency = data.currency;
        this.discountPercentage = data.discount || null;   //////////////////////co z tym null?
        this.discountAmount = this.price * this.discountPercentage * 0.01;
        this.priceMinusDiscountAmount = 12;
    }

    changeName(newValue: string) {
        const isValueValid = Validation.init(newValue).isValueStringNotEmpty().result;
        if (isValueValid) this.name = newValue;
    }

    changePrice(newValue: number) {
        const isValueValid = Validation.init(newValue).isValueNumberBiggerThanZero().result;
        if (isValueValid) this.price = newValue;
    }

    changeDiscount(newValue: number) {
        const isValueValid = Validation.init(newValue).isValueNumberBiggerThanZero().result;
        const isDiscountPercentageValid = newValue < 100;
        if (isValueValid && isDiscountPercentageValid) this.discountPercentage = newValue;

    }

    addCategory(newCategory: string) {
        const isValueValid = Validation.init(newCategory).isValueStringNotEmpty().result;
        if (isValueValid) this.category.push(newCategory);
    }
}

// const myProduct = new Product({})
// myProduct.addCategory = () => {}
// myProduct.currency = ''