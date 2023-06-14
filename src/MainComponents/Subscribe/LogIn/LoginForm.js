import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoginForm } from "./reducerLoginForm";

export default function LoginForm(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesage, setErrorMesage] = useState("");
  const dispatch = useDispatch(); 

  const status = useSelector((state) => state.loginForm.status);
  // const error = useSelector((state) => state.loginForm.error);
  // console.log(error);
  // const state = useSelector((state) => state.loginForm);
  // console.log(state);
  const navigate = useNavigate();

 const checkStatus = () =>{
      if (status === "admin") {
        console.log('//admin');
        navigate("/loggedin/admin");
      } else if (status === "user") {
        console.log('//user');
        navigate("/loggedin/user");
      } else {
        // localStorage.clear();
        console.log('//status: error');
        navigate("/login")
        setErrorMesage(status)
      }
  };
  
  // setemailANDpassword({ email, password });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLoginForm({ email, password }));
  };
  

  useEffect(()=>{
    checkStatus();
  },[status])

  // useEffect(()=>{
  //   checkStatus();
  // },[])

    return (
      <div className='containerLoginForm'>
        <div className='loginForm'>
          <h2>Log in</h2>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div><br />
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div><br />
          <div className='errorMesage'>
            <p>{errorMesage}</p>
          </div>
          {/* <p>{data}</p> */}
          <button className='loginButton' onClick={handleSubmit}>Submit</button>
        <hr/>
        <div className='registerP'><p>—————— There is no profile ——————</p></div>
        <Link Link to="/register">
          <button className='registerButton'>Register</button>
        </Link>
          <p>mariam@mail.com-Mariam, hasmik@mail.com-Hasmik </p>
        </div>
      </div>
      );
};