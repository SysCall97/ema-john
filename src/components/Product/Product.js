import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    // console.log(props.product);
    return (
        <div className='product'>
            <div className='image'>
                <img src={img} alt="" />
            </div>
            <div className='description'>
                <h3 className='product-name'>
                    <Link to={"/product/"+key}>{name}</Link>
                </h3>
                <p><small>by: {seller}</small></p>
                <p>Price: ${price}</p><br />
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button 
                    className='add-cart' 
                    onClick={() => props.handleAddCart(props.product)}>
                        <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;