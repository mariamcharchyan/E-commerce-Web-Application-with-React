import { useState, useEffect } from 'react';
import './AddProduct.css';

export default function AddProduct({setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    // for newProductData
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [newProductData, setNewProductData] = useState('');

    //for Add Product successed status
    const [successed, setSuccessed] = useState('');

    //for Add Product error status
    const [error, setError] = useState('');

    // for categories data 
    const [categories, setCategories] = useState([]);
    
    // for categories data 
    useEffect(() => setNewProductData(
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
            }
        })
            .then(response => response.json())
            .then(dataCategories => {
                const newDataCategories = dataCategories.map(data => ({ id: data.id, name: data.name }));
                setCategories(newDataCategories);
            })
            .catch(error => {
                setShowErrorModal(true);
                setError(`Error categories: ${error}`)
                console.error('Error get categories:', error);
        })
    ),[]);

    // for newProductData
    useEffect(() => setNewProductData(
        {
            image: image,
            name: name,
            price: price,
            discount_percentage: discountPercentage,
            quantity: quantity,
            description: description,
            categories_id: category
        }
    ),[image, name, price, discountPercentage, description, category]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAddProduct = () => {
        const accessToken = localStorage.getItem('token');
        fetch('http://localhost:3000/product/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            },
            body: JSON.stringify(newProductData)
           })
          .then(response => response.json())
          .then(data => {
            setSuccessed(data.successed)
          })
          .catch((error) => {
            setShowErrorModal(true);
            setError('Error: failed post product')
            console.error('Error:', error);
          });
    }

    return (
        <div className='addProductContainer'>
            <div><h3>---------- Add Product ----------</h3></div>
            <div className='addProduct'>
                <div className='image'>
                    <h5>Image URL:</h5>
                    {/* <p>BOY: https://target.scene7.com/is/image/Target/GUEST_f0b8f771-a771-49fd-b965-2000c642f7b1</p>
                    <p>GIRL: https://my-live-01.slatic.net/p/e3b9e8867491b17e1e67604930780f0e.jpg</p> */}
                    <input type='text' value={image} onChange={(event) => setImage(event.target.value)} />
                </div>
                <div className='name'>
                    <h5>Name:</h5>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className='category' >
                    <h5>Category:</h5>
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className='price'>
                    <h5>Price:</h5>
                    <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div className='discount_percentage'>
                    <h5>Discount Percentage:</h5>
                    <input type="text" value={discountPercentage} onChange={(event) => setDiscountPercentage(event.target.value)} />
                </div>
                <div className='discount_percentage'>
                    <h5>Quantity:</h5>
                    <input type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                </div>
                <div className='description'>
                    <h5>Description:</h5>
                    <textarea className="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div className='successed' > 
                    <p>{successed}</p>
                </div>
                <div className='error' > 
                    <p>{error}</p>
                </div>
                <div className='buttonAddProduct'>
                    <button onClick={handleAddProduct}>Add Product</button>
                </div>
            </div>
        </div>
    );
};