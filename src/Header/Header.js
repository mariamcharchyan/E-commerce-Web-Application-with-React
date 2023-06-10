import './Header.css';
import logo from './picturesHeader/logo.png';
import basket from './picturesHeader/basket.png';
import account from './picturesHeader/account.png';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const basketData = useSelector((state) => state.basket.data);
    console.log(basketData);

    let quantity = 0;
    basketData?.forEach((item) => {
        quantity += item.quantity;
    });

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
                        <Link to="#" className="link">About</Link>
                        <Link to="#" className="link">Contact</Link> 
                    </div>
                </div>
                <div className="navBarRight">
                    <div className="navBarRightAccount">
                        <Link to="/login" className="link">
                                <img src={account} className="accountImage" alt="account"/>
                        </Link>
                        <Link to="/login" className="link">
                            <div>Profile</div>
                        </Link>      
                    </div>
                    <div className="navBarRightBasket">
                        <Link to="/basket">
                            <img src={basket} className="basketImage" alt="basket"/>
                        </Link>
                        <div className="basketProductsQuantity">
                            {quantity}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;