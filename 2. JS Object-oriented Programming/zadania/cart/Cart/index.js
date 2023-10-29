import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../validation.js'
import { CartItem } from '../CartItem/index.js';

export class Cart {

    constructor(data) {
        Validation.init(data).isValueObjectType().isValueObjectNotEmpty();
        Validation.init(data.discount).isValueNumberType().isValuePositiveNumber();
        Validation.init(data.discountCode).isValueStringType().isValueStringNotEmpty();
        Validation.init(data.cartItems).isValueArrayType().isValueArrayNotEmpty();

        this._id = uuidv4();
        this.cartItems = data.cartItems;
        this.discountPercentage = data.discount;
        this.discountCode = data.discountCode;
    }

    get id() {
        return this._id;
    }

    addCartItem(cartItem) {
        // instanceof
        this.cartItemValidation(cartItem);
        const foundCartItem = this.cartItems.find(item => item.id === cartItem.id);

        if (foundCartItem) {
            foundCartItem.incrementQuantity();

            return
        }

        this.cartItems.push(cartItem);
    }

    removeCartItem(cartItem) {
        this.cartItemValidation(cartItem);
        const cartItemExists = this.cartItems.filter(item => item.id === cartItem.id)[0];
        if (!cartItemExists) throw new Error('This cartItem does not exist in this cart');

        if (cartItemExists) {
            for (const [index, item] of this.cartItems.entries()) {
                if (item.id === cartItem.id) this.cartItems.splice(index, 1);
            }
        }
    }

    changeCartItemQuantity(cartItem, newQuantity) {
        this.cartItemValidation(cartItem);
        Validation.init(newQuantity).throwError().isValueNumberType().isValuePositiveNumber();

        cartItem.changeProductQuantity(newQuantity);

        const isCartLineQuantityPositive = newQuantity > 0
        if (!isCartLineQuantityPositive) this.removeCartItem(cartItem);

    }

    sumUpTheCart(discountCode) {
        let sumOfTheCart = 0;

        const cartItemsPricesSum = this.cartItems.reduce((accumulator, currentItem) => {
            const cartItemTotalPrice = currentItem.product.priceMinusDiscountAmount * currentItem.productQuantity;
            accumulator = accumulator + cartItemTotalPrice;
            return accumulator;
        }, 0)

        if (discountCode) {
            Validation.init(discountCode).throwError().isValueStringType().isValueStringNotEmpty();
            const isDiscountCodeValid = this.discountCode === discountCode;

            if (!isDiscountCodeValid) throw new Error('Your discount code is not valid');

            sumOfTheCart = cartItemsPricesSum - cartItemsPricesSum * this.discountPercentage * 0.01;

            return sumOfTheCart;
        }

        return cartItemsPricesSum;
    }

    cartItemValidation(cartItem) {
        const isCartItemValid = cartItem instanceof CartItem;
        if (!isCartItemValid) throw Error('The cartItem object is invalid');
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

