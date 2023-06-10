import './LoggedInAdmin.css';
// import { isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginForm } from "../LogIn/reducerLoginForm";
import { useEffect, useState } from 'react';
import ErrorModal from './Services/ErrorModal'
import AdminPart from './AdminPart/AdminPart';
import Warning from './Services/Warning/Warning';
import GetProduct from './Services/GetProduct/GetProduct';
import DeleteProduct from './Services/DeleteProduct/DeleteProduct';
import AddProduct from './Services/AddProduct/AddProduct';
import UpdateProduct from './Services/UpdateProduct/UpdateProduct';
import CRUD_Category from './Services/CRUDcategory/CRUDcategory';


export default function LoggedInAdmin(){

    
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    // for showErrorModal from logout
    const [showErrorModal, setShowErrorModal] = useState(false);

    //for protect  to the /amin url 
    const status = localStorage.getItem('status')

    useEffect(() => {
        if(status !== 'admin'){
            navigate("/login")
        }
    },[])


    // function isTokenExpired(token) {

    //    return isExpired(token)
    //     // const decoded = jwt.decode(token);
    //     // const currentTime = Math.floor(Date.now() / 1000); // convert to seconds
    //     // return decoded.exp < currentTime;
    // }

    // const accessToken = localStorage.getItem('token');
    // useEffect(()=>{
    //     if (isTokenExpired(accessToken)) {
    //         console.log("Access token has expired!");
    //         // Send a message to the user or take appropriate action
    //     }else{console.log("Access token!");}
    // },[])

    //for admin or services data
    const [adminOrServices, setAdminOrServices] = useState(true);

    function AdminOrServices(truORfalse) {
        setAdminOrServices(truORfalse);
    }

    //for acardion in services
    const [services, setServices] = useState({
        warning: true,
        getProduct: false,
        deleteProduct: false,
        addProduct: false,
        updateProduct: false,
        CRUDcategory:false,
    });
    console.log(services);

    function setService(key) {
        setServices(() => {
            const newServices = {};
            for (let service in services) {
                if (service === key) {
                    newServices[service] = true;
                }else{
                    newServices[service] = false;
                }
            }
            return newServices;
        });
    }

    //for Logout button

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(fetchLoginForm(null, null));
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className='containerAdmin'>
            <div className='containerAdminBox'>
                <div className='containerAdminTop'>
                    {adminOrServices ?
                    <button onClick={() => AdminOrServices(false)}>Services</button>
                    : 
                    <button onClick={() => AdminOrServices(true)}>My Data</button>
                    }
                    <h1>ADMIN</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className='containerAdminBottom'>

                {adminOrServices ?
                 <AdminPart />
                 : 
                 <>
                    
                    {showErrorModal && (
                        <ErrorModal handleLogout={handleLogout} />
                    )}
                    <div className='containerAdminLeft'>
                        <h2>Services</h2>
                        <ul>
                            <h2>Products</h2>
                            <li onClick={() => setService("addProduct")}>Add Product</li>
                            <li onClick={() => setService("getProduct")}>Get Product</li>
                            <li onClick={() => setService("deleteProduct")}>Delete Product</li>
                            <li onClick={() => setService("updateProduct")}>Update Product</li>
                        </ul>
                        <ul>
                            <h2>Categories</h2>
                            <li onClick={() => setService("CRUDcategory")}>CRAD Category</li>
                        </ul>
                    </div>
                    <div  className='containerAdminRight'>
                    {services.warning ? <Warning /> : null}
                    {services.addProduct ? <AddProduct setShowErrorModal={setShowErrorModal}/> : null}
                    {services.getProduct ? <GetProduct setShowErrorModal={setShowErrorModal}/> : null}
                    {services.deleteProduct ? <DeleteProduct setShowErrorModal={setShowErrorModal}/> : null}
                    {services.updateProduct ? <UpdateProduct setShowErrorModal={setShowErrorModal}/> : null}
                    {services.CRUDcategory ? <CRUD_Category setShowErrorModal={setShowErrorModal}/> : null}
                    </div>
                    </>
                 }
                    
                </div>
            </div>
        </div>
    );
};