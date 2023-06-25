import './Products.css';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { BsCheckCircle } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";

export default function ProductEdit({editingID,setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    const [refresh, setRefresh] = useState(false);
    
    const [editing, setEditing] = useState(false);

    //for Get Products data
    const [productData, setproductData] = useState([]);
    console.log(productData);
   
    const [nameUpdate, setNameUpdate] = useState(productData.name);
    const [priceUpdate, setPriceUpdate] = useState(productData.price);
    const [discountPercentageUpdate, setDiscountPercentageUpdate] = useState(productData.discountPercentage);
    const [quantityUpdate, setQuantityUpdate] = useState(productData.quantity);
    const [descriptionUpdate, setDescriptionUpdate] = useState(productData.description);
    const [categoryUpdate, setCategoryUpdate] = useState(productData.category);
    console.log(categoryUpdate);

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
                // setShowErrorModal(true);
                // setError(`Error categories: ${error}`)
                console.error('Error get categories:', error);
        })
    },[]);

    // for products data 
    useEffect(() => {
        fetch(`http://localhost:5000/product/${editingID}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const newDataProducts = {
                     id: data.id,
                     images: data.productImages,
                     name: data.name,
                     category: data.category.name,
                     price: data.price,
                     discountPercentage: data.discountPercentage,
                     quantity: data.quantity,
                     quantity_sold: data.quantity_sold,
                     description: data.description,
                     createdAt: data.createdAt,
                     updatedAt: data.updatedAt
                    };
                    setproductData(newDataProducts);
                    console.log(newDataProducts);
                    setNameUpdate(data.name);
                    setPriceUpdate(data.price);
                    setDiscountPercentageUpdate(data.discountPercentage);
                    setQuantityUpdate(data.quantity);
                    setDescriptionUpdate(data.description);
                    setCategoryUpdate(data.categoryId);

            })
            .catch(error => {
                // setShowErrorModal(true);
                // setError('Error: failed get products')
                console.error('Error get products:', error);
        })
    },[refresh]);


    const handleCategoryChange = (event) => {
        setCategoryUpdate(event.target.value);
    };
    console.log(productData.images);
    
    // for Update Product data with id
    const handleUpdate = () => {
        fetch(`http://localhost:5000/product/update/${editingID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({
                categoryId: categoryUpdate,
                name: nameUpdate,
                price: priceUpdate,
                discountPercentage: discountPercentageUpdate,
                quantity: quantityUpdate,
                description: descriptionUpdate
            })
        })
        .then(response => {
            return response.json()
          })
        .then(data => {
            setRefresh(!refresh);
            console.log(data);
        })
        .catch((error) => {
            setShowErrorModal(true);
            console.error('Error:', error);
        });
    }



//     //for Update data
//     useEffect(() => setUpdateProductData(
//         {
//             image: imageUpdate,
//             name: nameUpdate,
//             price: priceUpdate,
//             discount_percentage: discountPercentageUpdate,
//             quantity: quantity,
//             description: descriptionUpdate,
//             categories_id: categoryUpdate
//         }),[
//             imageUpdate,
//             nameUpdate,
//             priceUpdate,
//             discountPercentageUpdate,
//             descriptionUpdate,
//             categoryUpdate,
//             quantity
//     ]);


    return (
        <div className='EditProductContainer-0'>
            <div className='EditProductContainer'>
                <div><h2>Edit Product</h2></div>
                <div className='EditProduct'>
                    <div className='EditProductName'>
                        <h5>Name:</h5>
                        <p>{productData.name}</p>
                        <input type="text" value={nameUpdate} onChange={(event) => setNameUpdate(event.target.value)} />
                        {/* <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> */}
                    </div>
                    <div className='EditProductCategory' >
                        <h5>Category:</h5>
                        <p>{productData.category}</p>
                        <select value={categoryUpdate} onChange={handleCategoryChange}>
                            <option value="">Select category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='EditProductPrice'>
                        <h5>Price($):</h5>
                        <p>{productData.price}</p>
                        <input type="text" value={priceUpdate} onChange={(event) => setPriceUpdate(event.target.value)} />
                    </div>
                    <div className='EditProductDiscount_percentage'>
                        <h5>Discount Percentage(%):</h5>
                        <p>{productData.discountPercentage}</p>
                        <input type="text" value={discountPercentageUpdate} onChange={(event) => setDiscountPercentageUpdate(event.target.value)} />
                    </div>
                    <div className='EditProductQuantity'>
                        <h5>Quantity:</h5>
                        <p>{productData.quantity}</p>
                        <input type="text" value={quantityUpdate} onChange={(event) => setQuantityUpdate(event.target.value)} />
                    </div>
                    <div className='EditProductQuantitySold'>
                        <h5>Quantity sold:</h5>
                        <p>{productData.quantity_sold}</p>
                       </div>
                    <div className='EditProductDescription'>
                        <h5>Description:</h5>
                        <p>{productData.description}</p>
                        <textarea className="description" value={descriptionUpdate} onChange={(event) => setDescriptionUpdate(event.target.value)}></textarea>
                    </div>
                    <div className='EditProductPictures'>
                        <h5>Pictures:</h5>
                        <div className='EditAllPictures'>
                            {productData?.images?.map((imageData) => (
                                <div className='EditImageData' key={imageData.id}>
                                    <img src={`http://localhost:5000/${imageData.imagePath}`} alt="Image" />
                                    <div className='EditImageDataDelete'><FaWindowClose/></div>
                                </div>
                            ))}
                        </div>
                        {/* <textarea className="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea> */}
                    </div>
                    <div><button onClick={() => handleUpdate()}>handleUpdate</button></div>
                    {/* {successed === 'Product added successfully'?
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
                    } */}
                
                </div>
            </div>
        </div>
    );
};