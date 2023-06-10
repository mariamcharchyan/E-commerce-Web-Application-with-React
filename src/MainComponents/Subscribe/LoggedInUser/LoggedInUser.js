import './LoggedInUser.css';
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

    //for Get Products data
    const [userData, setUserData] = useState([]);
    console.log(userData)

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    //for protect  to the /user url 
    const status = localStorage.getItem('status')

    useEffect(() => {
        if(status !== 'user'){
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
        const userId = localStorage.getItem('id');

        dispatch(fetchBasket(userId)); 

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
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    },[]);

    return (
        <div className='userPart'>
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
                <div className='logout'>
                    <button onClick={handleLogout}><b>Logout</b></button>
                </div>
            </div>
            <div className='aboutPerson'>
                <div className='shippingAddresses'><b>Shipping Addresses</b></div>
                <Link to="/user/cards"> 
                    <div className='paymentCards'><b>Payment Cards</b></div>
                </Link>
                <div className='orders'><b>Orders</b></div>
                <div className='deleteAccount'><b>DeleteAccount</b></div>
            </div>

            {/* <div className="userWelcomeMessage">
                <div></div>
                <h1>Welcome User!</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='userData'>
                <div className='userInage'>
                    <img src={`http://localhost:5000/${userData?.image}`} alt="User Image" />
                </div>
                <div className='userDataRight'>
                    <div><p className='p1'>Name: </p><p className='p2'>{userData.name}</p></div>
                    <div><p className='p1'>Surename: </p><p className='p2'>{userData.surename}</p></div>
                    <div><p className='p1'>Email: </p><p className='p2'>{userData.email}</p></div>
                    <div><p className='p1'>Gender: </p><p className='p2'>{userData.gender}</p></div>
                    <div><p className='p1'>Age: </p><p className='p2'>{userData.age}</p></div>
                </div>
            </div> */}
        </div>
    );
};