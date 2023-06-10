import './AdminPart.css';
import { useState, useEffect } from 'react';

export default function AdminPart(){
    // localStorage.setItem("email", emailANDpassword.email);
    // localStorage.setItem("password", emailANDpassword.password);
    // for Authorization
    const accessToken = localStorage.getItem('token');

    //for Get User data
    const [userData, setUserData] = useState([]);

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
            // setError(`Error: ${error}`)
            console.error('Error:', error);
        });
    
},[]);

    return (
        <div className='adminPart'>  
            <h1>Welcome Admin!</h1>
            <div className='adminData'>
                <div className='adminInage'>
                <img src={`http://localhost:5000/${userData?.image}`} alt="User Image" />
                </div>
                <div className='adminDataRight'>
                    <div><p className='p1'>Name: </p><p className='p2'>{userData.name}</p></div>
                    <div><p className='p1'>Surename: </p><p className='p2'>{userData.surename}</p></div>
                    <div><p className='p1'>Email: </p><p className='p2'>{userData.email}</p></div>
                    <div><p className='p1'>Gender: </p><p className='p2'>{userData.gender}</p></div>
                    <div><p className='p1'>Age: </p><p className='p2'>{userData.age}</p></div>
                </div>
            </div>
        </div>
    );
};