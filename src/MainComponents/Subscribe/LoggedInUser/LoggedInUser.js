import './LoggedInUser.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from "../LogIn/reducerLoginForm";
import { useState, useEffect } from 'react';
import { fetchBasket } from '../../Basket/reducerBasket';
import { Link } from 'react-router-dom';
// import { basketSlice } from '../../Basket/reducerBasket';


export default function LoggedInUser(){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    // for
    const isVerified = localStorage.getItem('isVerified');

    //for Get Products data
    const [userData, setUserData] = useState([]);
    console.log(userData)

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    //for protect  to the /user url 
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
    
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(fetchLoginForm(null, null));
        dispatch(fetchBasket(null));
        localStorage.clear();
        console.log("localStorage.clear()");
        navigate("/login");
    }

    useEffect(()  => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        fetch('http://localhost:5000/user/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({email, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.user.isVerified == true){
                localStorage.setItem("isVerified", data.user.isVerified);
                console.log(data);
                const newData= {
                    image: data.user.image,
                    name: data.user.firstName,
                    surename: data.user.lastName,
                    email: data.user.email,
                    gender: data.user.gender,
                    age: data.user.age
                };
                console.log(newData);

                setUserData(newData);

                localStorage.setItem("id", data.user.id);

                dispatch(fetchBasket(data.user.id)); 
            } else {
                const newData= {
                    verified: 'Follow the link in your email address for verification.'
                };
                console.log(newData);

                setUserData(newData);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    },[]);

    return (
        <div className='userPart'>

            {isVerified === 'true' ? (
            <>
                <div className='information'>
                    <div className='personalInformation'>
                        <div className='userInage'>
                            <img src={`http://localhost:5000/${userData?.image}`} alt="User Image" />
                        </div>
                        <div>
                            <p>{userData.name} {userData.surename}</p>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                    {/* <div className='logout'>
                        <button onClick={handleLogout}><b>Logout</b></button>
                    </div> */}
                </div>
                <div className='aboutPerson'>
                    <Link to="/user/shippingAddresses" style={{ textDecoration: 'none', color: 'inherit' }}> 
                        <div className='shippingAddresses'><b>Shipping Addresses</b></div>
                    </Link>
                    <Link to="/user/cards" style={{ textDecoration: 'none', color: 'inherit' }}> 
                        <div className='paymentCards'><b>Payment Cards</b></div>
                    </Link>
                    <Link to="/user/orders" style={{ textDecoration: 'none', color: 'inherit' }}> 
                        <div className='orders'><b>Orders</b></div>
                    </Link>
                    <div className='deleteAccount'><b>DeleteAccount</b></div>
                </div>
                </>
            ) : (
                <div className='noVerified'>
                    {/* {userData.verified} */}
                    <div><p>Your registration was successful.<br/>Go to your email address and verify your identity to be allowed to shop on the site.</p></div>
                </div>
            )}
        </div>
    );
};