import './Header.css';
import { BsCartFill} from "react-icons/bs";
import { AiTwotoneHeart } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import logo from './picturesHeader/logo.png';
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from '../MainComponents/Subscribe/LogIn/reducerLoginForm';
import { fetchBasket } from '../MainComponents/Basket/reducerBasket';

function Header() {
    // const status = useSelector((state) => state.loginForm.status);
    const isVerified = localStorage.getItem('isVerified');
    const status = localStorage.getItem('status');
    const basketData = useSelector((state) => state.basket.data);
    console.log(basketData);

    let quantity = 0;
    basketData?.forEach((item) => {
        quantity += item.quantity;
    });

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(fetchLoginForm(null, null));
        dispatch(fetchBasket(null));
        localStorage.clear();
        console.log("localStorage.clear()");
        navigate("/login");
    }

    return(  
        <header className="App-header">
            <div className="navBar">
                <div className="navBarLeft">
                    <div className="navBarLeftLogo">
                        <img src= {logo} className="brandLogo" alt="Logo"/>
                    </div>
                    <div className="navBarLeftItems">
                        <Link to="/" className="link">Home</Link>
                        <Link to="/products" className="link">Shop</Link>
                        <Link to="/aboute" className="link">About</Link>
                        <Link to="#" className="link">Contact</Link> 
                    </div>
                </div>
                <div className="navBarRight">
                    <div className="navBarRightBasket">
                        {quantity > 0 ?
                        <div className="basketProductsQuantity">
                            {quantity}
                        </div>
                        : ''} 
                        <Link to="/basket" className="link-icon">
                            <div><BsCartFill className='header-icon'/></div>
                        </Link>
                    </div>
                    {status === 'user' && isVerified === 'true' ? (
                    <div className="navBarRightFavorite">
                        <Link to="/login" className="link-icon">
                        <div>
                            <AiTwotoneHeart className='header-icon' />
                        </div>
                        </Link>
                    </div>
                    ) : ''}
                    <div className="navBarRightAccount">
                        <Link to="/login" className="link-icon">
                            <div><HiUserCircle className='header-icon'/></div>
                        </Link>      
                    </div>
                    {status === 'user' || status === 'admin' ?  
                    <div className="navBarRightLogout">
                        <Link to="/login" className="link-icon"
                            onClick={handleLogout}
                        >
                            <div><FiLogOut className='header-icon'/></div>
                        </Link>      
                    </div>
                    : ''}
                </div>
            </div>
        </header>
    )
};

export default Header;