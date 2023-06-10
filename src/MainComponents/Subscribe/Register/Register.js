import './Register.css';
import {Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchLoginForm } from "../LogIn/reducerLoginForm";

export default function Register() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  // for Authorization
  const accessToken = localStorage.getItem('token');

  //for Get User data
  const [userData, setUserData] = useState([]);

  // for newUserData
  const [errorMesage, setErrorMesage] = useState('');

  // for newUserData
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [newUserData, setNewUserData] = useState('');

  // for newUserData
    useEffect(() => setNewUserData(
      {
        image: image,
        name: name,
        surename: surename,
        age: age,
        gender: gender,
        email: email,
        password: password
      }
  ),[image, name, surename, age, gender, email, password]);

  const handleSubmit = () => {
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
       })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'user'){
          dispatch(fetchLoginForm({ email, password }));
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          navigate("/loggedin/user");
        } else {
          setErrorMesage(data.status)
        }
      })
      .catch((error) => {
        console.log();
        setErrorMesage(`Error: ${error}`)
        console.error('Error:', error);
      });
}

  return (
    <div className='containerRegister'>
      <div className="register">
        <h2>Register</h2>
        <div>
          <input
            type="text"
            value={image}
            placeholder="Image url"
            onChange={(event) => setImage(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="text"
            value={surename}
            placeholder="Surename"
            onChange={(event) => setSurename(event.target.value)}
          />
        </div><br/>
        <div>
              <input
              type="number"
              value={age}
              placeholder="Age"
              onChange={(event) => setAge(event.target.value)}
              />
        </div>
        <br/>
        <div>
          <input
            type="text"
            value={gender}
            placeholder="Gender"
            onChange={(event) => setGender(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div><br/>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div><br/>
        {/* <div>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div><br/> */}
        <div className='errorMesage'>
              <p>{errorMesage}</p>
            </div>
        <button className='register-Button'  onClick={handleSubmit}>Register</button><br/>
          <div className='loginP'><p>—————— There is profile ——————</p></div>
          <Link Link to="/login">
            <button className='login-Button'>Log in</button>
          </Link>
      </div>
    </div>
  );
}