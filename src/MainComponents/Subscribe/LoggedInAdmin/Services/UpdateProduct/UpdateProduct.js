import './UpdateProduct.css';
import UpdateProductID from './UpdateProductID';
import { useState, useEffect } from 'react';

export default function UpdateProduct({setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    //for Get Products data
    const [productsData, setproductsData] = useState([]);
    
    //for edit or cencel/save buttons
    const [isEditing, setIsEditing] = useState(true);

    //UpdateingID
    const [updateingProduct, setUpdateingProduct] = useState([]);

    // for Get Products data 
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
                     image: data.image,
                     name: data.name,
                     categories_id: data.categories_id,
                     price: data.price,
                     discount_percentage: data.discount_percentage,
                     quantity: data.quantity,
                     description: data.description,
                     createdAt: data.createdAt,
                     updatedAt: data.updatedAt
                    }));
                    console.log(newDataProducts);
                     setproductsData(newDataProducts);
            })
            .catch(error => {
                setShowErrorModal(true);
                // setError('Error: failed get products')
                console.error('Error get products:', error);
        })
    },[isEditing]);

    return (
        isEditing ?
        <div className='updateProductContainer'>
            <div><h3>---------- Update Product ----------</h3></div>
            <div className='updateProductData'>
                <div><p>id</p></div>
                <div><p>image</p></div>
                <div><p>name</p></div>
                <div><p>cat_id</p></div>
                <div><p>price</p></div>
                <div><p>discount</p></div>
                <div><p>quantity</p></div>
                <div><p>description</p></div>
                <div><p>update</p></div>
            </div>
            <div className='updateProducts'>
                {productsData.slice().reverse().map((product) => (
                    <div className='updateProduct' key={product.id} >
                        <div><p>{product.id}</p></div>
                        <div><img src={product.image}/></div>
                        <div><p>{product.name}</p></div>
                        <div><p>{product.categories_id}</p></div>
                        <div><p>{product.price} USD</p></div>
                        <div><p>{product.discount_percentage} %</p></div>
                        <div><p>{product.quantity}</p></div>
                        <div className='productDescription'><p>{product.description}</p></div>
                        <div className='productUpdate'><button onClick={() => {setIsEditing(false); setUpdateingProduct(product)}}>Update</button></div>
                    </div>
                ))}
            </div>
        </div>
        :
        <UpdateProductID 
            setIsEditing={setIsEditing}
            product={updateingProduct}
            setShowErrorModal={setShowErrorModal}/>    
    );
};