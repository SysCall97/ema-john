import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    return (
        <div style={{
            borderBottom: "1px solid lightgray",
            marginBottom: "5px",
            paddingBottom: "5px",
            marginLeft: "200px"
        }} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price: ${price}</small></p>
            <br />
            <button className="add-cart" onClick={() => props.handleRemoveProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;