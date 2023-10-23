import { Cart } from './Cart/index.js';
import { CartItem } from './CartItem/index.js';

const item1 = {
    name: 'keyboard',
    category: 'devices',
    price: 5,
    discount: 10
}

const item2 = {
    name: 'mouse',
    category: 'devices',
    price: 15,
    discount: 5
}

const newCartItem1 = new CartItem();
newCartItem1._init(item1)
const newCartItem2 = new CartItem()
newCartItem2._init(item2)

console.log(newCartItem1)

const cartInst = {
    products: [{ product: newCartItem1, amount: 5 }, { product: newCartItem2, amount: 5 }],
    discount: 10,
    discountCode: 'FGFG5'
}

const newCart = new Cart();
newCart._init(cartInst);
newCart.addProduct(newCartItem1);
newCart.changeProductAmount(newCartItem1, 'increase');
newCart.changeProductAmount(newCartItem2, 'decrease');
newCart.removeProduct(newCartItem1);
console.log('sum', newCart.sumUpTheCart());
console.log(newCart)
