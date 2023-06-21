import { useState, useEffect } from 'react';
import { BsCheckCircle } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import './AddProduct.css';

export default function AddProduct({setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    // for newProductData
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [newProductData, setNewProductData] = useState('');

    // for added product id
    const [newProductid, setNewProductid] = useState(null);

    // for new Product image data
    const [image, setImage] = useState(null);
    const [addedProductImagesData, setAddedProductImagesData] = useState([]);
    // console.log(addedProductImagesData);

    // for refresh
    const [refresh, setRefresh] = useState(false);

    // for Add Product successed status
    const [successed, setSuccessed] = useState('');

    // for Add Product error status
    const [error, setError] = useState('');

    // for categories data 
    const [categories, setCategories] = useState([]);
    
    // for categories data 
    useEffect(() => {
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
    },[]);

    // for newProductData
    useEffect(() => setNewProductData(
        {
            name: name,
            categoryId: category,
            price: price,
            discountPercentage: discountPercentage,
            quantity: quantity,
            description: description,
        }
    ),[ name, price, discountPercentage, description, category]);


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAddProduct = () => {
            // console.log(newProductData);
        const accessToken = localStorage.getItem('token');
        fetch('http://localhost:5000/product/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            },
            body: JSON.stringify(newProductData)
           })
          .then(response => response.json())
          .then(data => {
            console.log(data.prod.id);
            setNewProductid(data.prod.id)
            setSuccessed(data.successed)
          })
          .catch((error) => {
            setShowErrorModal(true);
            setError('Error: failed post product')
            console.error('Error:', error);
          });
    }

    // for new Product image data
    useEffect(() => {
        fetch(`http://localhost:5000/productImages/${newProductid}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAddedProductImagesData(data);
            })
            .catch(error => {
                setShowErrorModal(true);
                setError(`Error categories: ${error}`)
                console.error('Error get categories:', error);
        })
    },[refresh]);

    //
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleAddImage = () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("productId", newProductid);
      
        fetch('http://localhost:5000/productImage/new', {
          method: 'POST',
          headers: {
            'Authorization': `${accessToken}`
          },
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setRefresh(!refresh);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    return (
    <div className='addProductContainer-0'>
        <div className='addProductContainer'>
            <div><h2>Add Product</h2></div>
            <div className='addProduct'>
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
                <div className='quantity'>
                    <h5>Quantity:</h5>
                    <input type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                </div>
                <div className='description'>
                    <h5>Description:</h5>
                    <textarea className="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>

                {successed === 'Product added successfully'?
                <>
                    <div className='successed' > 
                        <p><BsCheckCircle/> {successed}</p>
                    </div>
                    <div>
                        <h2>Add picture for the added product</h2>
                        <div className='addPicture'>
                            <input
                                type='file'
                                className='productImageInput'
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <button onClick={handleAddImage}>Add picture</button>
                        </div>
                        <div className='imagesData'>
                            {addedProductImagesData.map((imageData) => (
                                <div className='imageData' key={imageData.id}>
                                    <img src={`http://localhost:5000/${imageData.imagePath}`} alt="Image" />
                                    <div className='imageDataDelete'><FaWindowClose/></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='error' > 
                        <p>{error}</p>
                    </div>
                    <div className='buttonAddProduct'>
                        <button onClick={handleAddProduct}>Add Product</button>
                    </div>
                </>
                }
                
            </div>
        </div>
    </div>
    );
};