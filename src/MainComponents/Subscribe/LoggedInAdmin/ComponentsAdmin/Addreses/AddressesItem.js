import './Addresses.css';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaWindowClose } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function AddressesItem({address, setRefresh, refresh, setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    const [isEditing, setIsEditing] = useState(true);

    const [addressUpdate, setAddressUpdate] = useState(address.address);
    const [cityUpdate, setCityUpdate] = useState(address.city);
    const [stateUpdate, setStateUpdate] = useState(address.state);
    const [zipcodeUpdate, setZipcodeUpdate] = useState(address.zipcode);
    const [shippingAdressUpdate, setShippingAdressUpdate] = useState({addressUpdate,cityUpdate,stateUpdate,zipcodeUpdate});

    const handleUpdateAddres = (id, addressUpdate, cityUpdate, stateUpdate, zipcodeUpdate) => {
        console.log(addressUpdate, cityUpdate, stateUpdate, zipcodeUpdate);
        fetch(`http://localhost:5000/shippingAddress/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({
                address: addressUpdate,
                city: cityUpdate,
                state: stateUpdate,
                zipcode: zipcodeUpdate
            })
        })
        .then(response => {
            setRefresh(!refresh);
            console.log(refresh);
            return response.json();
          })
        // .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            if(error.message == 'Forbidden'){
                setShowErrorModal(true);
            }
            console(error.message);
        });
    }
    const handleDeleteAddres  = (id) => {
        const accessToken = localStorage.getItem('token');
        fetch(`http://localhost:5000/shippingAddress/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            }
        })
        .then(response => {
            setRefresh(!refresh);
            console.log(refresh);
            if (response.ok && response.status !== 204) {
                return response.json();
            } else {
                return null;
            }
        })
        .then(data => {
            if (data) {
                console.log(data);
            }
        })
        .catch((error) => {
            if(error.message == 'Forbidden'){
                setShowErrorModal(true);
            }
            console(error.message);
        });
    }


    return (
        <div className='getShippingAddressBodyItem'>
            <div className='getShippingAddressId'><p>{address.id}</p></div>
            {isEditing ?
            <>
                <div className='getShippingAddressName'>
                    <div className='getShippingAddressNameContainer'>
                        <div><p><b>Address :</b></p><p>{address.address}</p></div>
                        <div><p><b>City :</b></p><p>{address.city}</p></div>
                        <div><p><b>State:</b></p><p>{address.state}</p></div>
                        <div><p><b>Zipcode:</b></p><p>{address.zipcode}</p></div>
                    </div>
                </div>
                <div className='editShippingAddress'><MdEdit className='admin-icon-edit' onClick={()=>{setIsEditing(false)}} /></div>
                <div className='deleteShippingAddress'><RiDeleteBin6Fill className='admin-icon-delete' onClick={()=>{handleDeleteAddres(address.id);}}/></div>
            </>
            :
            <>
                <div className='getShippingAddressName'>
                    <div className='getShippingAddressNameContainer'>
                        <div><p><b>Address :</b></p>
                            <input type='text' value={addressUpdate} onChange={(event) => setAddressUpdate(event.target.value)} />
                        </div>
                        <div><p><b>City :</b></p><p></p>
                            <input type='text' value={cityUpdate} onChange={(event) => setCityUpdate(event.target.value)} />
                        </div>
                        <div><p><b>State:</b></p><p></p>
                            <input type='text' value={stateUpdate} onChange={(event) => setStateUpdate(event.target.value)} />
                        </div>
                        <div><p><b>Zipcode:</b></p><p></p>
                            <input type='text' value={zipcodeUpdate} onChange={(event) => setZipcodeUpdate(event.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='updateShippingAddress'><RxUpdate className='admin-icon-update' onClick={()=>{handleUpdateAddres(address.id, addressUpdate, cityUpdate, stateUpdate, zipcodeUpdate); setIsEditing(true);}} /></div>
                <div className='cancelShippingAddress'><FaWindowClose className='admin-icon-close' onClick={()=>{setIsEditing(true); setRefresh(!refresh)}} /></div>
            </>
            }

        </div>
    );
};