import { v1 as uuidv4 } from 'uuid';
import { Validation } from '../../../validation.ts';
import { Product } from '../Product/index.ts'

type ProductType = InstanceType<typeof Product>;

interface CartItemInterface {
    readonly id: string;
    product: ProductType;
    productQuantity: number;
    changeProductQuantity(newQuantity: number): void;
    incrementQuantity(): void;
    decrementQuantity(): void;
}

export class CartItem implements CartItemInterface {
    readonly id: string;
    product: ProductType;
    productQuantity: number;

    constructor(product: ProductType, quantity: number) {
        Validation.init(product).throwError().isValueObjectNotEmpty();
        Validation.init(quantity).throwError().isValueNumberBiggerThanZero();

        this.id = uuidv4();
        this.product = product;
        this.productQuantity = quantity;
    }

    changeProductQuantity(newQuantity: number) {
        Validation.init(newQuantity).throwError().isValuePositiveNumber();
        this.productQuantity = newQuantity;
    }

    incrementQuantity() {
        this.changeProductQuantity(this.productQuantity + 1)
    }

    decrementQuantity() {
        this.changeProductQuantity(this.productQuantity - 1)
    }
}