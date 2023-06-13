import './SelectShippingAddresses.css';
import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { fetchLoginForm } from "../LogIn/reducerLoginForm";
// import { fetchBasket } from '../../Basket/reducerBasket';
// import { basketSlice } from '../../Basket/reducerBasket';


export default function SelectShippingAddresses(){

    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('token');
 
    const [searchValue, setSsearchValue] = useState([]);
    const [shippingAddresses, setShippingAddresses] = useState([]);
    console.log(shippingAddresses);
 
    const filteredShippingAddresses = shippingAddresses.filter(shippingAddress => {
        if (typeof searchValue === 'string') {
            return shippingAddress.address.toLowerCase().includes(searchValue.toLowerCase());
        }
        return shippingAddresses;
    });

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


    return (
        <div className='addressesContainer'>
            <div className='addresses'>
                <div className='addressesTitle'>
                    <h3>Select Shipping Addresses</h3>
                </div>
                <div className='search'>
                    <input
                        type='text'
                        placeholder='Search shipping addres...'
                        className='serchInput'
                        onChange={(e) => setSsearchValue(e.target.value)}
                    />
                    {/* <img src={imgSerch} alt='' className='serchImg' /> */}
                </div>
                <div className='allAddresses'>
                    {filteredShippingAddresses.map((shippingAddress) => (
                        <div className='allAddress' key={shippingAddress.id}>
                            <div className=''>
                                <p>{shippingAddress.address}, {shippingAddress.state}</p>
                            </div>  
                            <div className=''>
                                <button
                                    // onClick={() => hendleDeleteUserShippingAddress(shippingAddress.id)}
                                ><b>+</b></button>
                            </div>      
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};