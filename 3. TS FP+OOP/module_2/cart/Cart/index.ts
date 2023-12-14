import { v1 as uuid } from 'uuid';
import { CartItem } from '../CartItem/index.ts';
import { Validation } from '../../../validation.ts';

interface CartObjectInterface {
    cartItems: CartItem[];    /////////////////////////////czy to jest ok?
    discount: number;
    discountCode: string;
}

type CartItemType = InstanceType<typeof CartItem>

interface CartInterface {
    readonly id: string;
    cartItems: object[];
    discountPercentage: number;
    discountCode: string;
    addCartItem(cartItem: CartItemType): void;
    removeCartItem(cartItem: CartItemType): void;
    changeCartItemQuantity(cartItem: CartItemType, newQuantity: number): void;
    sumUpTheCart(discountCode: string): number;
}


export class Cart implements CartInterface {

    readonly id: string;
    cartItems: CartItemType[];
    discountPercentage: number;
    discountCode: string

    constructor(data: CartObjectInterface) {   ///////////////////////////???
        Validation.init(data).isValueObjectNotEmpty();
        Validation.init(data.discount).isValuePositiveNumber();
        Validation.init(data.discountCode).isValueStringNotEmpty();
        Validation.init(data.cartItems).isValueArrayNotEmpty();

        this.id = uuid();
        this.cartItems = data.cartItems;
        this.discountPercentage = data.discount;
        this.discountCode = data.discountCode;
    }

    addCartItem(cartItem: CartItemType) {//////////////////////////////////////////////////nie widzi kluczy z obiektów (???)
        const foundCartItem = this.cartItems.find(item => item.id === cartItem.id);

        if (foundCartItem) {
            foundCartItem.incrementQuantity();

            return
        }

        this.cartItems.push(cartItem);
    }

    removeCartItem(cartItem: CartItemType) {
        const cartItemExists = this.cartItems.filter(item => item.id === cartItem.id)[0];
        if (!cartItemExists) throw new Error('This cartItem does not exist in this cart');

        if (cartItemExists) {
            for (const [index, item] of this.cartItems.entries()) {
                if (item.id === cartItem.id) this.cartItems.splice(index, 1);
            }
        }
    }

    changeCartItemQuantity(cartItem: CartItemType, newQuantity: number) {
        Validation.init(newQuantity).throwError().isValuePositiveNumber();
        cartItem.changeProductQuantity(newQuantity);

        const isCartLineQuantityPositive = newQuantity > 0
        if (!isCartLineQuantityPositive) this.removeCartItem(cartItem);

    }

    sumUpTheCart(discountCode: string) {
        let sumOfTheCart = 0;

        const cartItemsPricesSum = this.cartItems.reduce((accumulator, currentItem) => {
            const cartItemTotalPrice = currentItem.product.priceMinusDiscountAmount * currentItem.productQuantity;
            accumulator = accumulator + cartItemTotalPrice;
            return accumulator;
        }, 0)

        if (discountCode) {
            Validation.init(discountCode).throwError().isValueStringNotEmpty();
            const isDiscountCodeValid = this.discountCode === discountCode;

            if (!isDiscountCodeValid) throw new Error('Your discount code is not valid');

            sumOfTheCart = cartItemsPricesSum - cartItemsPricesSum * this.discountPercentage * 0.01;

            return sumOfTheCart;
        }

        return cartItemsPricesSum;
    }
}


