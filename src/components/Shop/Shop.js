import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    // const products = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    // const products = first10;
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('https://cryptic-chamber-46128.herokuapp.com/products')
        .then(res =>res.json())
        .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

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

    const handleAddCart = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product
                        showAddToCart={true}
                        product={product}
                        key={product.key}
                        handleAddCart={handleAddCart}
                    ></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className='add-cart'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;