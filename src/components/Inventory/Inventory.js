import React from 'react';
// import fakeData from '../../fakeData';

const inventory = () => {
    const handleAddProduct = () => {
        fetch('https://cryptic-chamber-46128.herokuapp.com/addProduct', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default inventory;