import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    let tax, baseTax = 12.99;

    if(totalPrice === 0) tax = 0;
    else if(totalPrice>500) tax = baseTax + totalPrice * 0.02;
    else if(totalPrice<50) tax = 5.99;
    else tax = baseTax + totalPrice * 0.01;


    let shippingCost=0;

    if(totalPrice>50) shippingCost = 0;
    else if(totalPrice>30) shippingCost = 3.99;
    else if(totalPrice>10) shippingCost = 4.99;

    const grandTotal = totalPrice + tax + shippingCost;

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items ordered: {cart.length}</p>
            <p>Items: ${(totalPrice.toFixed(2))}</p>
            <p><small>Shipping Cost: ${(shippingCost).toFixed(2)}</small></p>
            <p><small>Tax: ${(tax).toFixed(2)}</small></p>
            <p>Total Code: {grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;