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

  // for newUserData
  const [errorMesage, setErrorMesage] = useState('');

  // for newUserData
  const [image, setImage] = useState(null);
  console.log(image);
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [newUserData, setNewUserData] = useState('');

  // for check status after register 
  let status = localStorage.getItem('status');

  const checkStatus = () =>{
      if (status === "admin") {
        console.log('//admin');
        navigate("/loggedin/admin");
      } else if (status === "user") {
        console.log('//user');
        navigate("/loggedin/user");
      } else {
        // localStorage.clear();
        console.log('//status: error', status);
        navigate("/login")
        setErrorMesage(status)
      }
  };

  // for newUserData
  // useEffect(() => setNewUserData(
  //   {
  //     image: image,
  //     firstName: name,
  //     lastName: surename,
  //     age: age,
  //     gender: gender,
  //     email: email,
  //     password: password
  //   }
  // ),[image, name, surename, age, gender, email, password]);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // console.log(file);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setImage(reader.result);
    // };
    // reader.readAsDataURL(file);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("firstName", name);
      formData.append("lastName", surename);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          // No need to set the 'Content-Type' header explicitly when sending FormData
          // The browser will automatically set the appropriate 'Content-Type'
          // 'Authorization' header can be added if needed
          // 'Authorization': `Bearer ${accessToken}`,
        },
        body: formData
      });
  
      const data = await response.json();
      console.log(data.newUser);
      console.log(data.token);
  
      if (data.token) {
        await dispatch(fetchLoginForm({ email, password }));
        checkStatus();
      } else {
        setErrorMesage('error');
      }

          console.log(response); // Log the response object
    } catch (error) {
      console.error('Error:', error);
      setErrorMesage(`Error: ${error}`);
    }
  };
 
  return (
    <div className='containerRegister'>
      <div className="register">
        <h2>Register</h2>
        <div>
          <input
            type='file'
            id='file'
            className='custom-file-input'
            accept="image/*"
            onChange={handleImageUpload}
          />
          {/* <input
            type="text"
            value={image}
            placeholder="Image url"
            onChange={(event) => setImage(event.target.value)}
          /> */}
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