import './Products.css';
import { useState, useEffect } from 'react';

export default function Products({setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    //for Get Products error status
    const [error, setError] = useState('');

    //for Get Products data
    const [productsData, setproductsData] = useState([]);
    console.log(productsData);

    // for products data 
    useEffect(() => {
        fetch('http://localhost:5000/products', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
            }
        })
            .then(response => response.json())
            .then(dataProducts => {
                console.log(dataProducts);
                const newDataProducts = dataProducts.map(data => ({
                     id: data.id,
                     image: data.productImages[0].imagePath,
                     name: data.name,
                     category: data.category.name,
                     price: data.price,
                     discountPercentage: data.discountPercentage,
                     quantity: data.quantity,
                     quantity_sold: data.quantity_sold,
                     description: data.description,
                     createdAt: data.createdAt,
                     updatedAt: data.updatedAt
                    }));
                    console.log(newDataProducts);
                     setproductsData(newDataProducts);
            })
            .catch(error => {
                setShowErrorModal(true);
                setError('Error: failed get products')
                console.error('Error get products:', error);
        })
},[]);

    return (
        <div className='getProductContainer'>
            <div><h3>---------- Get Product ----------</h3></div>
            <div className='productData'>
                    <div><p>id</p></div>
                    <div><p>image</p></div>
                    <div><p>name</p></div>
                    <div><p>cat_id</p></div>
                    <div><p>price</p></div>
                    <div><p>discount</p></div>
                    <div><p>quantity</p></div>
                    <div><p>description</p></div>
                    {/* <div><p>{product.createdAt}</p></div>
                    <div><p>{product.updatedAt}</p></div> */}
            </div>
            <div className='getProducts'>
                {productsData.map((product) => (
                <div className='product' key={product.id} >
                    <div><p>{product.id}</p></div>
                    <div><img src={product.image}/></div>
                    <div><p>{product.name}</p></div>
                    <div><p>{product.category}</p></div>
                    <div><p>{product.price} USD</p></div>
                    <div><p>{product.discountPercentage} %</p></div>
                    <div><p>{product.quantity}</p></div>
                    <div className='productDescription'><p>{product.description}</p></div>
                    {/* <div><p>{product.createdAt}</p></div>
                    <div><p>{product.updatedAt}</p></div> */}
                </div>
                ))}
            </div>
        </div>
    );
};