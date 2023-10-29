import { Cart } from './Cart/index.js';
import { CartItem } from './CartItem/index.js';
import { Product } from './Product/index.js';

const item1 = {
    name: 'keyboard',
    category: ['devices', 'electronic'],
    price: 50,
    currency: 'PLN',
    discount: 10
}

const item2 = {
    name: 'mouse',
    category: ['devices'],
    price: 15,
    currency: 'PLN',
    discount: 5
}

const product1 = new Product(item1);
const product2 = new Product(item2);

// console.log(product2);

const cartItem1 = new CartItem(product1, 5);
const cartItem2 = new CartItem(product2, 5);
// console.log(cartItem1)

cartItem1.changeProductQuantity(15);
// console.log(cartItem1)


const cartObject = {
    cartItems: [cartItem1, cartItem2],
    discount: 10,
    discountCode: '1010'
}

const cart1 = new Cart(cartObject);
cart1.changeCartItemQuantity(cartItem1, 222);
console.log(cart1.sumUpTheCart('1010'));

console.log(cart1);
