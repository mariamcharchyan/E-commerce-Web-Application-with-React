import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Routes, Route} from 'react-router-dom';
import BoxToys from './MainComponents/Shop/BoxToys';
import BoxToyID from './MainComponents/Shop/BoxToyID';
import LoginForm from './MainComponents/Subscribe/LogIn/LoginForm';
import Register from './MainComponents/Subscribe/Register/Register';
import LoggedInAdmin from './MainComponents/Subscribe/LoggedInAdmin/LoggedInAdmin';
import LoggedInUser from './MainComponents/Subscribe/LoggedInUser/LoggedInUser'
import Basket from './MainComponents/Basket/Basket'
import ToConfirmation from './MainComponents/Basket/ToConfirmation';
import PaymentCards from './MainComponents/Subscribe/LoggedInUser/PaymentCards/PaymentCards';
import BindingCard from './MainComponents/Subscribe/LoggedInUser/PaymentCards/BindingCard';
import ShippingAddresses from './MainComponents/Subscribe/LoggedInUser/ShippingAddresses/ShippingAddresses';
import SelectShippingAddresses from './MainComponents/Subscribe/LoggedInUser/ShippingAddresses/SelectShippingAddresses';
import Home from './MainComponents/Home/Home';
import Aboute from './MainComponents/About/Aboute';
import Orders from './MainComponents/Subscribe/LoggedInUser/Orders/Orders';
import OrderId from './MainComponents/Subscribe/LoggedInUser/Orders/OrderId';

// import { useState } from 'react';

function App() {
  // const [emailANDpassword, setemailANDpassword] = useState();
  // console.log(emailANDpassword);

  return (
    <div className="App">
      <div className="AppWrapper">
        <Header />
        <div className="MainContent">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/aboute' element={<Aboute />} />
            <Route path='/products' element={<BoxToys />} />
            <Route path='/product/:id' element={<BoxToyID />} />
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<LoginForm />}/>
            <Route path='/loggedin/admin' element={<LoggedInAdmin />}/>
            <Route path='/loggedin/user' element={<LoggedInUser />}/>
            <Route path='/user/shippingAddresses' element={<ShippingAddresses />}/>
            <Route path='/user/shippingAddresses/select' element={<SelectShippingAddresses />}/>
            <Route path='/user/cards' element={<PaymentCards />}/>
            <Route path='/user/cards/binding' element={<BindingCard />}/>
            <Route path='/user/orders' element={<Orders />}/>
            <Route path='/user/orders/:id' element={<OrderId />}/>
            <Route path='/basket' element={<Basket />}/>
            <Route path='/basket/toConfirmation' element={<ToConfirmation />}/>
          </Routes>
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
