import './ToConfirmation.css'
import jwt_decode from 'jwt-decode';
import pencil from './pencil.png';
import mastercardIcon from '../Subscribe/LoggedInUser/PaymentCards/images/mastercardIcon.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBasket } from './reducerBasket';
import { useState } from 'react';

export default function ToConfirmation () {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const userId = localStorage.getItem('id')
    const cardData = JSON.parse(localStorage.getItem('cardData'));
    const shippingAddressData = JSON.parse(localStorage.getItem('shippingAddressData'));
    const totalProducts =useSelector((state) => state.basket.totalProducts);
    const totalAmount = useSelector((state) => state.basket.totalAmount);

    //for protect  to the /user url 
    const accessToken = localStorage.getItem('token');

    useEffect(() => {
        if(accessToken){
            const decoded = jwt_decode(accessToken)
            console.log(decoded);
            const status = decoded.status
            if(status !=='user'){
                navigate("/login")
            }
        } else {
            navigate("/login")
        }
    },[])

    const addOrder = () => {
        fetch(`http://localhost:5000/order/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "userId": userId,
                "cardId": cardData.id, 
                "shippingAddressId": shippingAddressData.id
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("addOrder: ", data);
            navigate("/basket")
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="toConfirmation">
            <div className="sippingAddres">
                <div className="text">
                    {shippingAddressData?
                        <p>{shippingAddressData.address}, {shippingAddressData.state}</p>
                        :
                        <p>Select the shipping address</p>
                    }
                </div>
                <div className="icon">
                    <Link to="/user/shippingAddresses"> 
                        <img src={pencil} alt="pencil"/>
                    </Link>
                </div>
            </div>
            <div className="paymentCard">
                <div className="text">
                    {cardData?
                        <div className='storedCard'>
                            <div>
                                <img src={mastercardIcon} alt=""/>
                            </div>
                            <div>{cardData.cardNumber}</div>
                            <div>{cardData.cardExpiry}</div>
                        </div>
                        :
                        <p>Select or add a payment card</p>
                    }
                    
                </div>
                <div className="icon">
                    <Link to="/user/cards"> 
                        <img src={pencil} alt="pencil"/>
                    </Link>
                </div>
            </div>
            <div className="totalProducts">
                <div className="text"><p>Total products .............................................................................................................. </p></div>
                <div className="number"><p>{totalProducts}  pcs</p></div>
            </div>
            <div className="totalAmount">
                <div className="text"><p>Total amount ................................................................................................................</p></div>
                <div className="number"><p>{totalAmount}  USD</p></div>
            </div>
            <div className="toOrder">
                <button
                    onClick={() => addOrder()}
                ><b>To Order</b></button>
            </div>
        </div>
    )
}