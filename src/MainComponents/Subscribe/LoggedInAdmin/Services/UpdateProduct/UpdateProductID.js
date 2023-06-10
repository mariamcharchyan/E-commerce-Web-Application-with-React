import './UpdateProductID.css';
import { useState, useEffect } from 'react';

export default function UpdateProduct({setIsEditing, product, setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');
        //for Get Product with id
        const [productData, setproductData] = useState([]);
        console.log(productData);
 
    //for Update data
    const [imageUpdate, setImageUpdate] = useState(product.image);
    const [nameUpdate, setNameUpdate] = useState(product.name);
    const [priceUpdate, setPriceUpdate] = useState(product.price);
    const [discountPercentageUpdate, setDiscountPercentageUpdate] = useState(product.discount_percentage);
    const [quantity, setQuantity] = useState(product.quantity);
    const [descriptionUpdate, setDescriptionUpdate] = useState(product.description);
    const [categoryUpdate, setCategoryUpdate] = useState(product.categories_id);
    console.log(categoryUpdate);

    //for Post Product with id
   const [updateProductData, setUpdateProductData] = useState([]);
   console.log(updateProductData);

    // for categories data 
    const [categories, setCategories] = useState([]);

    const handleCategoryChange = (event) => {
        setCategoryUpdate(event.target.value);
    };
    // for Update Product data with id
    const handleUpdate = (id) => {
        fetch(`http://localhost:5000/product/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify(updateProductData)
        })
        .then(response => {
            setIsEditing(true)
            return response.json()
          })
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            setShowErrorModal(true);
            console.error('Error:', error);
        });
    }

    // for categories data 
    useEffect(() => setUpdateProductData(
        fetch('http://localhost:3000/categories', {
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
                console.log(newDataCategories);
            })
            .catch(error => {
                setShowErrorModal(true);
                console.error(`Error categories: ${error}`);
        })
    ),[]);

    //for Update data
    useEffect(() => setUpdateProductData(
        {
            image: imageUpdate,
            name: nameUpdate,
            price: priceUpdate,
            discount_percentage: discountPercentageUpdate,
            quantity: quantity,
            description: descriptionUpdate,
            categories_id: categoryUpdate
        }),[
            imageUpdate,
            nameUpdate,
            priceUpdate,
            discountPercentageUpdate,
            descriptionUpdate,
            categoryUpdate,
            quantity
    ]);



    return (
        <div className='updateProductContainer'>
            <div><h3>---------- Update Product with {product.id} id----------</h3></div>
            <div className='updateProductID'>
            <div className='addProduct'>
                <div className='image'>
                    <h5>Image URL:</h5>
                    <input type='text' value={imageUpdate} onChange={(event) => setImageUpdate(event.target.value)} />
                </div>
                <div className='name'>
                    <h5>Name:</h5>
                    <input type="text" value={nameUpdate} onChange={(event) => setNameUpdate(event.target.value)} />
                </div>
                <div className='category' >
                    <h5>Category:</h5>
                    <select value={categoryUpdate} onChange={handleCategoryChange}>
                        {/* <option value="">Select category</option> */}
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className='price'>
                    <h5>Price:</h5>
                    <input type="text" value={priceUpdate} onChange={(event) => setPriceUpdate(event.target.value)} />
                </div>
                <div className='discount_percentage'>
                    <h5>Discount Percentage:</h5>
                    <input type="text" value={discountPercentageUpdate} onChange={(event) => setDiscountPercentageUpdate(event.target.value)} />
                </div>
                <div className='discount_percentage'>
                    <h5>Quantity:</h5>
                    <input type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                </div>
                <div className='description'>
                    <h5>Description:</h5>
                    <textarea className="description" value={descriptionUpdate} onChange={(event) => setDescriptionUpdate(event.target.value)}></textarea>
                </div>
            </div>
            </div>
            <div className='updateProductButtons'>
                <div className='productSaveButton'><button onClick={() =>  {handleUpdate(product.id)}}>SAVE</button></div>
                <div className='productCencelButton'><button onClick={() => setIsEditing(true)}>CENCELE</button></div>
            </div>
        </div>
    );
};