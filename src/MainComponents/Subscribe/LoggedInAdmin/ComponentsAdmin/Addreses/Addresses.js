import './Addresses.css';
import AddressesItem from './AddressesItem';
import { useState, useEffect } from 'react';

export default function Addresses({setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');


    // for add new address
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    // for Addresses data 
    const [addresses, setAddresses] = useState([]);
    // const [categories, setCategories] = useState([]);
    console.log(addresses);

    
    const [refresh, setRefresh] = useState(false);

    const handleAddAddress = (address,city,state,zipcode) => {
        fetch(`http://localhost:5000/shippingAddress/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({address,city,state,zipcode})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRefresh(refresh);
        })
        .catch((error) => {
            if(error == 'Forbidden'){
                setShowErrorModal(true);
            }
            console.error( error);
        });
    }

    // for categories data 
    useEffect(() => {   
        fetch('http://localhost:5000/shippingAddresses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
        }
        })
            .then(response => response.json())
            .then(data => {
                setAddresses(data);
                // setAddress(data.address);
                // setCity(data.city);
                // setState(data.state);
                // setZipcode(data.zipcode);
                console.log(data);
                // setCategories(newDataCategories);
            })
            .catch(error => {
                // if(error == 'SyntaxError: Unexpected token "F", "Forbidden" is not valid JSON'){
                    setShowErrorModal(true);
                // }
                console.error(error);
        })
    },[refresh]);

    return (
        <div className='ShippingAddressesContainer-0'>
            <div className='ShippingAddressesContainer'>
            <div><h2>Shipping Addresses</h2></div>
            <div className='addShippingAddress'>
                {/* <div><h4>Add New Shipping Address</h4></div> */}
                <div>
                    <div>
                        <div className='input' ><p><b>Address:</b></p>
                        <input 
                            type='text' 
                            value={address} 
                            placeholder="Address"
                            onChange={(event) => setAddress(event.target.value)} 
                        />
                        </div>
                        <div className='input' ><p><b>City:</b></p><p></p>
                        <input 
                            type='text' 
                            value={city} 
                            placeholder="City"
                            onChange={(event) => setCity(event.target.value)} 
                        />
                        </div>
                        <div className='input' ><p><b>State:</b></p><p></p>
                        <input 
                            type='text' 
                            value={state} 
                            placeholder="State"
                            onChange={(event) => setState(event.target.value)} 
                        />
                        </div>
                        <div className='input' ><p><b>Zipcode:</b></p><p></p>
                        <input 
                            type='text' 
                            value={zipcode} 
                            placeholder="Zipcode"
                            onChange={(event) => setZipcode(event.target.value)} 
                        />
                        </div>
                    </div>
                    <div className='button'>
                        <button
                            onClick={()=>{
                                handleAddAddress(address,city,state,zipcode);
                                setAddress(''); setCity(''); setState(''); setZipcode('');
                                setRefresh(!refresh);}}
                        >Add New Address</button>
                    </div>
                </div>
            </div>
            {/* <div><h4>Shipping Addresses</h4></div> */}
            <div className='getShippingAddress'>
                <div className='getShippingAddressTitle'>
                    <div className='getShippingAddressId'><p>id</p></div>
                    <div className='getShippingAddressName'><p>name</p></div>
                    <div></div>
                </div>
                {addresses.map((address) => (
                   <AddressesItem
                    key={address.id} 
                    address={address} 
                    setRefresh={setRefresh}
                    refresh={refresh}
                    setShowErrorModal={setShowErrorModal}/>
                ))}
            </div>
        </div>
        </div>
    );
};