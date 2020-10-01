import React from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import { useState } from 'react';
import { useEffect } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    // const [placeOrder, setPlaceOrder] = useState(false);
    const history = useHistory();



    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);

        fetch('https://cryptic-chamber-46128.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                data.forEach(product => {
                    const cart = getDatabaseCart();
                    product.quantity = cart[product.key];
                });
                setCart(data);
            })
    }, []);

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(item => item.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handleProceedCheckOut = () => {
        history.push("/shipment");
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <h1>Cart Items: {cart.reduce((total, pd) => total + pd.quantity, 0)}</h1>
                {
                    cart.map(product => <ReviewItem product={product} handleRemoveProduct={handleRemoveProduct} key={product.key}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className='add-cart' onClick={handleProceedCheckOut}>Proceed Checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;