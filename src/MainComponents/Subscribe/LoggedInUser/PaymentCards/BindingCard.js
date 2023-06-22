import './BindingCard.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import card from './images/card.png';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { fetchLoginForm } from "../LogIn/reducerLoginForm";
import {  useEffect,useState } from 'react';
// , useEffect
// import { fetchBasket } from '../../Basket/reducerBasket';
// import { basketSlice } from '../../Basket/reducerBasket';


export default function BindingCard(){
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState();
    const [cardExpiry, setCardExpiry] = useState();
    const [cardHolder, setCardHolder] = useState();
    const [cardCVV, setCardCVV] = useState();

    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('token');
    const isVerified = localStorage.getItem('isVerified');

    //for protect  to the /user url 
    useEffect(() => {
        if(accessToken){
            const decoded = jwt_decode(accessToken)
            const status = decoded.status
            if(status !=='user'){
                navigate("/login")
            } else if(!isVerified){
                navigate("/loggedin/user")
            }
        } else {
            navigate("/login")
        }
    },[])

    const hendleAddCardData = () => {
        fetch('http://localhost:5000/savedCard/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({
                "userId": userId,
                "cardNumber": cardNumber, 
                "cardHolder": cardHolder,
                "cardExpiry": cardExpiry, 
                "cardCVV": cardCVV
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success){
                navigate("/user/cards")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='bindingCard'>
            <div className='bindingCardTitle'> 
                <h3>Card binding</h3>
            </div>
            <div className='bindingCardMain'>
                <div>
                    <img src={card} alt=""/>
                </div>
                <div className='cardNumber'><input type='text' value={cardNumber} placeholder= '**** **** **** ****' 
                    onChange={(event) => {setCardNumber(event.target.value)}}/></div>
                <div className='cardExpiry'><input type='text' value={cardExpiry} placeholder= '** / **'
                    onChange={(event) => {setCardExpiry(event.target.value)}} /></div>
                <div className='cardHolder'><input type='text' value={cardHolder} placeholder='Full name'
                    onChange={(event) => {setCardHolder(event.target.value)}} /></div>
                <div className='cardCVV'><input type='text' value={cardCVV} placeholder= '***'
                    onChange={(event) => {setCardCVV(event.target.value)}} /></div>
            </div>
            <div className='bindingCardButton'>
                <div>
                    <button onClick={() => hendleAddCardData()}>BINDING</button>
                </div>
            </div>
        </div>
    );
};