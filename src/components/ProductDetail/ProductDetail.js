import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        if(productKey) {
            console.log(`https://cryptic-chamber-46128.herokuapp.com/product/${productKey}`);
            fetch(`https://cryptic-chamber-46128.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => setProduct(data))
        }
    }, [productKey]);

    return (
        <div>
            {/* <h1>{name}</h1>
            <h2>Features:</h2>
            <ul>
                {
                    features.map(feature => <li>{feature.description}: {feature.value}</li>)
                }
            </ul> */}
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;