import './SelectShippingAddresses.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import searchIcon from './searchIcon.png';
// import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { fetchLoginForm } from "../LogIn/reducerLoginForm";
// import { fetchBasket } from '../../Basket/reducerBasket';
// import { basketSlice } from '../../Basket/reducerBasket';


export default function SelectShippingAddresses(){

    const navigate = useNavigate();

    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('token');
    const isVerified = localStorage.getItem('isVerified');
 
    const [searchValue, setSsearchValue] = useState([]);
    const [shippingAddresses, setShippingAddresses] = useState([]);
    console.log(shippingAddresses);
 
    const filteredShippingAddresses = shippingAddresses.filter(shippingAddress => {
        if (typeof searchValue === 'string') {
            return shippingAddress.address.toLowerCase().includes(searchValue.toLowerCase());
        }
        return shippingAddresses;
    });
    
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

    useEffect(() => {   
        fetch(`http://localhost:5000/shippingAddresses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setShippingAddresses(data)

        })
        .catch(error => {
            // setShowErrorModal(true);
            console.error(error);
        })
    },[]);

    const hendleAddUserShippingAddress = (id) => {
        console.log(id);
        fetch('http://localhost:5000/userShippingAddress/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({
                "userId": userId,
                "shippingAddressId": id
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // setRefresh(!refresh);
        })
        .catch(error => {
            // setShowErrorModal(true);
            console.error(error);
        })
    };

    return (
        <div className='addressesContainer'>
            <div className='addresses'>
                <div className='addressesTitle'>
                    <h3>Select Shipping Addresses</h3>
                </div>
                <div className='search'>
                    <div className='searchInputContainer'>
                        <img src={searchIcon} alt='' className='searchImg' />
                        <input
                            type='text'
                            placeholder='Search shipping address...'
                            className='searchInput'
                            onChange={(e) => setSsearchValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className='allAddresses'>
                    {filteredShippingAddresses.map((shippingAddress) => (
                        <div className='allAddress' key={shippingAddress.id}>
                            <div className=''>
                                <p>{shippingAddress.address}, {shippingAddress.state}</p>
                            </div>  
                            <div className=''>
                                <button
                                    onClick={() => hendleAddUserShippingAddress(shippingAddress.id)}
                                ><b>+</b></button>
                            </div>      
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};