import './ToConfirmation.css'
import pencil from './pencil.png';
import mastercardIcon from '../Subscribe/LoggedInUser/PaymentCards/images/mastercardIcon.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBasket } from './reducerBasket';
import { useState } from 'react';

export default function ToConfirmation () {
    const [shippingAddress, setShippingAddress] = useState("Shipping to the point of issue");
    const [paymentCard, setPaymentCard] = useState("Payment by card");
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const storedCardData = JSON.parse(localStorage.getItem('cardData'));

    // userId, cardId, shippingAddressId


    // const [refreshBasket,setRefreshBasket] = useState(true)

    // const userId = localStorage.getItem('id');
    // const userId = useSelector((state) => state.loginForm.id);

    // const dispatch = useDispatch();
    
    // useEffect(() => {
    //     if(userId){
    //         dispatch(fetchBasket(userId));
    //     }
    // },[refreshBasket]);

    // const basketData = useSelector((state) => state.basket.data);
    // console.log(basketData);


    // const hendleDeleteAll = (userId) => {
    //     fetch(`http://localhost:5000/basketItems/delete/${userId}`, {
    //         method: 'DELETE',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify({
    //             "userId": userId,
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setRefreshBasket(!refreshBasket)
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // }

    return (
        <div className="toConfirmation">
            {/* <div className="toConfirmationTitle"><p> -------------------- Confirmation -------------------- </p></div> */}
            <div className="sippingAddres">
                <div className="text"><p>{shippingAddress}</p></div>
                <div className="icon">
                    <Link to="#"> 
                        <img src={pencil} alt="pencil"/>
                    </Link>
                </div>
            </div>
            <div className="paymentCard">
                <div className="text">
                    {storedCardData?
                        <div className='storedCard'>
                            <div>
                                <img src={mastercardIcon} alt=""/>
                            </div>
                            <div>{storedCardData.cardNumber}</div>
                            <div>{storedCardData.cardExpiry}</div>
                        </div>
                        :
                        <p>{paymentCard}Payment by card</p>
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
                <button><b>To Order</b></button>
            </div>
        </div>
    )
}