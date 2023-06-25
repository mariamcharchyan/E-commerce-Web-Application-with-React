import './Products.css';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaWindowClose } from "react-icons/fa";
import { useState, useEffect } from 'react';
import ProductEdit from './ProductEdit';

export default function Products({setService,setEditingID,setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    const [refresh, setRefresh] = useState(false);

    // for update product
    // const [editing, setEditing] = useState(false);
    // const [editingID, setEditingID] = useState(null);

    //for Get Products error status
    const [error, setError] = useState('');
    console.log(error);

    //for Get Products data
    const [productsData, setproductsData] = useState([]);
    console.log(productsData);

    // for products data 
    useEffect(() => {
        fetch('http://localhost:5000/products?offset=0&limit=500', {
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
                     image: data.productImages,
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
                    // console.log(newDataProducts);
                     setproductsData(newDataProducts);
            })
            .catch(error => {
                setShowErrorModal(true);
                setError('Error: failed get products')
                console.error('Error get products:', error);
        })
    },[refresh]);

    const handleDeleteProduct = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            }
           })
            .then(response =>  response.json())
            .then(data => {
                setRefresh(!refresh);
                console.log(data);
            })
            .catch((error) => {
                // setShowErrorModal(true);
                console.log(error);
            });
    }

    return (
        <div className='getProductContainer-0'>
        <div className='getProductContainer'>
            {/* {editing === false ?
            <> */}
            <div><h2>Products</h2></div>
            <div className='getProductMain'>
                {productsData.map((product) => (
                    <div className='getProductItem' key={product.id}>
                        <div className='getProductImage'>
                            <img src={`http://localhost:5000/${product?.image?.[0]?.imagePath}`} alt="Image" />
                        </div>
                        <div className='getProductName'>{product.name}</div>
                        <div className='getProductPrice'>$ {product.price} USD</div>
                        <div className='getProductIcons'>
                            <div className='getProductIconEdit'><MdEdit onClick={() => {setEditingID(product.id); setService("productEdit"); }}/></div>
                            <div className='getProductIconDelete'><RiDeleteBin6Fill onClick={() => handleDeleteProduct(product.id)}/></div>
                        </div>
                    </div>
                ))}
            </div>
            {/* </> : <>
                <ProductEdit
                    editingID={editingID}
                    editing={editing}
                    setEditing={setEditing}
                />
            </>}  */}

        </div>
        </div>
    );
};