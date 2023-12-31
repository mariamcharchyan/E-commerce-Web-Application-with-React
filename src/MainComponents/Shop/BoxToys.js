import './BoxToys.css';
import { Link } from 'react-router-dom';
import { useParams} from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoxToysData } from './reducerBoxToys';
import { fetchBasket } from '../Basket/reducerBasket';
import { useState } from 'react';

export default function BoxToys(){

  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(null);

  const accessToken = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  const dispatch = useDispatch();
  const boxToysData = useSelector((state) => state.boxToys.data);
 
  const handleAddProduct = (productId) => {
    console.log(productId,userId);
    fetch('http://localhost:5000/basketItem/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      },
      body: JSON.stringify({
        "userId": userId,
        "productId": productId
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch(fetchBasket(userId));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  useEffect(() => {
    dispatch(fetchBoxToysData(catId));
  }, [catId]);

  //for categories
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
      console.log(dataCategories);
      const newDataCategories = dataCategories.map(data => ({ id: data.id, name: data.name }));
      setCategories(newDataCategories);
    })
    .catch(error => {
    // setShowErrorModal(true);
      console.error(error);
    })
  },[]);

    return (
      <div className='products'>
        <div className='categories'>
          <h3>ALL PRODUCTS</h3>
          <div className='categoryName'
            onClick={() => setCatId(null)}
          ><p>All products</p></div>
          <h3>CATEGORIES</h3>
          {categories.map((category) => (
            <div className='categoryName' 
              key={category.id}
              onClick={() => setCatId(category.id)}
            ><p>{category.name}</p></div>
          ))}
        </div>
        <div className='boxToys'>
          {boxToysData.map((toyData) => (
            <div className='boxToy' key={toyData.id}>
                <div className='boxToyImage'>
                <Link to={`/product/${toyData.id}`}>
                    {toyData?.productImages?.[0]?.imagePath ? (
                    <img
                        src={`http://localhost:5000/${toyData.productImages[0].imagePath}`}
                        alt={toyData.name}
                    />
                    ) : (
                    <span>Image not available</span>
                    )}
                </Link>
                </div>
                <div  className='boxToyName'>
                    <h4>{toyData.name}</h4>
                </div>
                <div  className='boxToyPrice'>
                    <p>$ {toyData.price} USD</p>
                </div>
                <div className='boxToyAdd'>
                <button
                  onClick={ () => {handleAddProduct(toyData.id);}} 
                  style={{ pointerEvents: toyData.quantity <= 1 ? 'none' : 'block',
                  color: toyData.quantity <= 1 ? '#b0054c' : ''}}
                > {toyData.quantity <= 0 ? "IS UNAVAILABL" : "Add to Basket"}</button>
                </div>
            </div>
          ))}
        </div>
      </div>
      );
    }