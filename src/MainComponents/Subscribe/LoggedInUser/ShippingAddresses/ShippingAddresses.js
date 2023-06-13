import './ShippingAddresses.css';
import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { fetchLoginForm } from "../LogIn/reducerLoginForm";
// import { fetchBasket } from '../../Basket/reducerBasket';
// import { basketSlice } from '../../Basket/reducerBasket';


export default function ShippingAddresses(){

    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('token');

    const [refresh, setRefresh] = useState(false);
    const [userShippingAddresses, setUserShippingAddresses] = useState([]);
    console.log(userShippingAddresses);
    
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // const handleAddressSelect = (shippingAddressData) => {
    //     setSelectedAddressId(shippingAddressData.id);
    //     localStorage.setItem('shippingAddressData', shippingAddressData);
    // };
   

    const hendleDeleteUserShippingAddress = (id) => {
        fetch(`http://localhost:5000/userShippingAddress/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRefresh(!refresh);
        })
        .catch(error => {
            // setShowErrorModal(true);
            console.error(error);
        })
    };

    //get User Shipping Addresses
    useEffect(() => {   
        fetch(`http://localhost:5000/userShippingAddresses/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUserShippingAddresses(data.userShippingAddresses)

        })
        .catch(error => {
            // setShowErrorModal(true);
            console.error(error);
        })
    },[refresh]);


    return (
        <div className='addressesContainer' >
            <div className='addresses'>
                <div className='addressesTitle'> 
                    <h3>Shipping addresses</h3>
                </div>
                <div className='addedAddresses'>
                    {userShippingAddresses.map((address) => (
                        <div className='addedAddress' key={address.id}>
                            <div>
                                <input
                                    type='radio'
                                    checked={selectedAddressId === address.shippingAddressId}
                                    onChange={() => {
                                        const shippingAddressData = JSON.stringify({
                                            id: address.shippingAddressId,
                                            address: address.shippingAddress.address,
                                            state: address.shippingAddress.state
                                        });
                                        setSelectedAddressId(address.shippingAddressId);
                                        localStorage.setItem('shippingAddressData', shippingAddressData);
                                    }}
                                />
                                <p>{address.shippingAddress.address}, {address.shippingAddress.state}</p>
                            </div>  
                            <div>
                                <button
                                onClick={() => hendleDeleteUserShippingAddress(address.id)}
                                >X</button>
                            </div>      
                        </div>
                    ))}
                </div>
                <div className='addAddresses'>
                    <Link to="/user/shippingAddresses/select" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div><b>+</b>add shipping address</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};