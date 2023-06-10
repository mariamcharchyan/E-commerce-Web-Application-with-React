import './DeleteProduct.css';
import { useState, useEffect } from 'react';

export default function DeleteProduct({setShowErrorModal}){
    
    // for Authorization
    const accessToken = localStorage.getItem('token');
    
    // for refresh Get Products data 
    const [refresh, setRefresh] = useState(false);

    //for Get Products error status
    const [error, setError] = useState('');

    //for Get Products data
    const [productsData, setproductsData] = useState([]);
    console.log(productsData);

    // for Delete Product data with id
    const handleDelete = (id) => {
        const accessToken = localStorage.getItem('token');
        fetch(`http://localhost:5000/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            }
           })
           .then(response => {
            setRefresh(!refresh);
            console.log(refresh);
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch((error) => {
            setShowErrorModal(true);
            setError(`Error: ${error}`)
            console.error('Error delete product:', error);
          });
    }

    // for Get Products data 
    useEffect(() => {
        fetch('http://localhost:3000/products', {
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
                setError('Error: failed get products')
                console.error('Error get products:', error);
        })
    },[refresh]);

    return (
        <div className='deleteProductContainer'>
            <div><h3>---------- Delete Product ----------</h3></div>
            <div className='deleteProductData'>
                <div><p>id</p></div>
                <div><p>image</p></div>
                <div><p>name</p></div>
                <div><p>cat_id</p></div>
                <div><p>price</p></div>
                <div><p>discount</p></div>
                <div><p>quantity</p></div>
                <div><p>description</p></div>
                <div><p>delete</p></div>
            </div>
            <div className='deleteProducts'>
                {productsData.slice().reverse().map((product) => (
                <div className='deleteProduct' key={product.id} >
                    <div><p>{product.id}</p></div>
                    <div><img src={product.image}/></div>
                    <div><p>{product.name}</p></div>
                    <div><p>{product.categories_id}</p></div>
                    <div><p>{product.price} USD</p></div>
                    <div><p>{product.discount_percentage} %</p></div>
                    <div><p>{product.quantity}</p></div>
                    <div className='productDescription'><p>{product.description}</p></div>
                    <div className='productDelete'><button 
                        onClick={() => handleDelete(product.id)}
                    >DELETE</button></div>
                </div>
                ))}
            </div>
        </div>
    );
};