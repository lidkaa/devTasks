import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../validation.js';

export class CartItem {

    constructor(product, quantity) {
        Validation.init(product).throwError().isValueObjectType().isValueObjectNotEmpty();
        Validation.init(quantity).throwError().isValueNumberType().isValueNumberBiggerThanZero();

        this._id = uuidv4();
        this.product = product;
        this.productQuantity = quantity;
    }

    get id() {
        return this._id;
    }

    changeProductQuantity(newQuantity) {
        Validation.init(newQuantity).throwError().isValueNumberType().isValuePositiveNumber();
        this.productQuantity = newQuantity;
    }

    incrementQuantity() {
        this.changeProductQuantity(this.productQuantity + 1)
    }
    decrementQuantity() {
        this.changeProductQuantity(this.productQuantity - 1)
    }
}