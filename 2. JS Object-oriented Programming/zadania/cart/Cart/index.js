import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../Utils/validation.js'

export class Cart {

    constructor() {
        this._id = uuidv4();
        this.products = null;
        this.discount = null;
        this.discountCode = null;
    }

    _init(data) {
        Validation.init(data.discount).isValueNumberType().isValuePositiveNumber();
        Validation.init(data.discountCode).isValueStringType().isValueStringNotEmpty();
        Validation.init(data.products).isValueArrayType().isValueArrayNotEmpty();

        this.products = data.products;
        this.discount = data.discount;
        this.discountCode = data.discountCode;
    }

    get id() {
        return this._id;
    }

    addProduct(product) {

        // zla

        const isProductValid = Validation.init(product).isValueObjectType().isValueObjectNotEmpty().result;
        const productExists = this.products.filter(item => item.product.id === product.id)[0];

        if (isProductValid && !productExists) {

            const newProduct = {
                product: product,
                amount: 1
            }

            this.products.push(newProduct);
        }

        if (productExists) {
            for (const item of this.products) {
                if (item.product.id === product.id) item.amount++
            }
        }
    }

    removeProduct(product) {
        const isProductValid = Validation.init(product).isValueObjectType().isValueObjectNotEmpty().result;
        const productExists = this.products.filter(item => item.product.id === product.id)[0];

        if (!productExists) throw new Error('Product does not exist in this cart');

        if (isProductValid) {
            for (const [index, item] of this.products.entries()) {
                if (item.id === product.id) this.products.splice(index, 1);
            }
        }
    }
    // value
    changeProductAmount(product, change) {
        const isProductValid = Validation.init(product).isValueObjectType().isValueObjectNotEmpty().result;
        const productToUpdate = this.products.filter(item => item.product.id === product.id)[0];

        if (isProductValid && productToUpdate) {
            if (change === 'increase') productToUpdate.amount++;
            if (change === 'decrease' && productToUpdate.amount > 0) productToUpdate.amount--;
        }
        console.log('or', productToUpdate)

        if (productToUpdate.amount === 0) this.removeProduct(product);
    }

    sumUpTheCart() {
        let sumOfTheCart = 0;
        const productsPricesSum = this.products.reduce((accumulator, currentItem) => {
            const productPriceWithDiscount = currentItem.product.calculatePriceWithDiscount() * currentItem.amount;
            accumulator = accumulator + productPriceWithDiscount;
            return accumulator;
        }, 0)

        if (this.discountCode) {
            sumOfTheCart = productsPricesSum - productsPricesSum * this.discount * 0.01;
        }
        return sumOfTheCart;
    }
}
// Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
// Ma umożliwiać: 
// - dodawanie/usuwanie przedmiotów do/z koszyka
// - zmianę ilości produktu w koszyku
// - podliczać wartość koszyka uwzględniajac rabaty

// Product

// Cart Item

// Cart

cart.addProduct(CartItem)