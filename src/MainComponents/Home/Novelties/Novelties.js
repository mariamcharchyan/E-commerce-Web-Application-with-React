import './Novelties.css'
// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import { Link } from 'react-router-dom';
import { useParams} from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBasket } from '../../Basket/reducerBasket';
import { useState } from 'react';
import newIcon from './new.png';


export default function Novelties(){

    
    const [productLeadersData, setProductLeadersData] = useState([]);
    const [catId, setCatId] = useState(null);
  
    const accessToken = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
  
    const dispatch = useDispatch();
    // const boxToysData = useSelector((state) => state.boxToys.data);
   
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
        fetch(`http://localhost:5000/newProducts`, {
            method: 'Get',
            headers: {
              'Content-Type': 'application/json',
            //   'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProductLeadersData(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return(
        <div className='noveltiesContainer'>
        <div className='novelties'>
            <div className='noveltiesTitle'>
                <h2> ___________________________________________________ Novelties ___________________________________________________ </h2>
            </div>
            <div className='noveltiesMain'>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                clickable: true,
                }}
                breakpoints={{
                "@0.00": {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                "@0.75": {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                "@1.00": {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                "@1.50": {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {productLeadersData.map((toyData) => (
                    <SwiperSlide className='slide' key={toyData.id}>
                        <div className='slideBoxToy'>
                            <div className='slideBoxToyImage'>
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
                            <div className='slideBoxToyAdd'>
                                <button
                                    onClick={ () => {handleAddProduct(toyData.id);}} 
                                    style={{ pointerEvents: toyData.quantity <= 1 ? 'none' : 'block',
                                        color: toyData.quantity <= 1 ? '#b0054c' : ''}}
                                > {toyData.quantity <= 1 ? "Not available" : "Add to Basket"}</button>
                            </div>
                            <div className="newIcon" ><img src= {newIcon}  alt=""/></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </div>
    </div>
    )
}
