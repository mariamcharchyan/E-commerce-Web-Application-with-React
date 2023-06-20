import './Basket.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBasket } from './reducerBasket';
import { useState } from 'react';
import BasketItem from './BasketItem';

export default function Basket () {
    const [refreshBasket,setRefreshBasket] = useState(true)

    const userId = localStorage.getItem('id');
    // const userId = useSelector((state) => state.loginForm.id);

    console.log("userId=", userId);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(userId){
            dispatch(fetchBasket(userId));
        }
    },[refreshBasket]);

    const basketData = useSelector((state) => state.basket.data);
    console.log(basketData);

    let totalPrice = 0;
    let quantity = 0;
    basketData?.forEach((item) => {
        totalPrice += item.quantity * item.productData.price;
        quantity += item.quantity;
    });



    const hendleDeleteAll = (userId) => {
        fetch(`http://localhost:5000/basketItems/delete/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "userId": userId,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRefreshBasket(!refreshBasket)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="basket">
            <h2 className="basket-items-title">Basket items</h2>
            <div className="basket-items">
                <div className="basket-items-header">
                    <div className="item-number"><b>N</b></div>
                    <div className="item-image"></div>
                    <div className="item-description"><b>Description</b></div>
                    <div className="item-price"><b>Price ($)</b></div>
                    <div className="item-quantiti"><b>Quantiti</b></div>
                    <div className="item-delete"><b>Delete</b></div>
                </div>
                {basketData?.map((item,index) => (
                    <BasketItem 
                        refreshBasket = {refreshBasket}
                        setRefreshBasket = {setRefreshBasket}
                        item = {item}
                        index = {index}
                    />
                ))}
                <div className="basket-items-footer">
                    <div className="item-number"></div>
                    <div className="item-image"></div>
                    <div className="item-name"><b>That's all:</b></div>
                    <div className="item-price"><b>{totalPrice}</b></div>
                    <div className="item-quantiti"><b>{quantity}</b></div>
                    <div className="items-delete"><button
                        onClick={() => hendleDeleteAll(userId)}
                    >Delete all</button></div>
                </div>
            </div>

                {userId?
                <>
                <div className="basket-items-to-confirmation">   
                    <Link to="/basket/toConfirmation">
                        <button>To confirmation</button>
                    </Link>  
                </div>
                </>
                :
                <>
                <div className="basket-items-to-order">
                    <Link to="/register">
                        <button>Register and order</button>
                    </Link>
                    <Link to="/login">
                        <button>Log in and order</button>
                    </Link>
                </div>
                </>
                }
        </div>
    )
}