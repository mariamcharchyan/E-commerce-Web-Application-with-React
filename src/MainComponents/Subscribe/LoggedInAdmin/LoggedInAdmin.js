import './LoggedInAdmin.css';
// import { isExpired } from 'react-jwt';
import jwt_decode from 'jwt-decode';
import { ImHome } from "react-icons/im";
import { BsBagFill } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsBagCheckFill } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { fetchLoginForm } from "../LogIn/reducerLoginForm";
import { useEffect, useState } from 'react';
// import ErrorModal from './Services/ErrorModal'
// import AdminPart from './AdminPart/AdminPart';
// import Warning from './Services/Warning/Warning';
// import GetProduct from './Services/GetProduct/GetProduct';
// import DeleteProduct from './Services/DeleteProduct/DeleteProduct';
// import AddProduct from './Services/AddProduct/AddProduct';
// import UpdateProduct from './Services/UpdateProduct/UpdateProduct';
// import CRUD_Category from './Services/CRUDcategory/CRUDcategory';
import Categories from './ComponentsAdmin/Categories/Categories';
import Addresses from './ComponentsAdmin/Addreses/Addresses';
import Products from './ComponentsAdmin/Products/Products';
import AddProduct from './ComponentsAdmin/AddProduct/AddProduct';
import ProductEdit from './ComponentsAdmin/Products/ProductEdit';


export default function LoggedInAdmin(){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    // const dispatch = useDispatch(); 
    const navigate = useNavigate();

    // for showErrorModal from logout
    const [showErrorModal, setShowErrorModal] = useState(false);

    // for update product
    const [editingID, setEditingID] = useState(null);

    //for protect  to the /amin url 
    useEffect(() => {
        if(accessToken){
            const decoded = jwt_decode(accessToken)
            console.log(decoded);
            const status = decoded.status
            if(status !=='admin'){
                navigate("/login")
            }
        } else {
            navigate("/login")
        }
    },[])

    
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
            setUserData(data);
        })
        .catch((error) => {
            // setError(`Error: ${error}`)
            console.error('Error:', error);
        });
    
    },[]);

    //for acardion in services
    const [services, setServices] = useState({
        dashboard: true,
        products: false,
        productEdit: false,
        addProduct: false,
        categories: false,
        shippingAddresses: false,
        users: false,
        orders: false,
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

    return (
        <div className='containerAdmin'>
            <div className='containerAdminLeft'>
                <div className='adminPersonalInformation'>
                    <div className='adminInage'>
                        <img src={`http://localhost:5000/${userData?.user?.image}`} alt="User Image" />
                    </div>
                    <div className='adminTitle'>
                        <h2>Admin</h2>
                    </div>
                </div>
                <div className='Dashboard' onClick={() => setService("dashboard")} >
                    <div><ImHome className={services.dashboard ? 'admin-icon-active' : 'admin-icon'}/></div>
                    <div>Dashboard</div>
                </div>
                <div className='Products' onClick={() => setService("products")} >
                    <div><BsBagFill className={services.products ? 'admin-icon-active' : 'admin-icon'}/></div>
                    <div>Products</div>
                </div>
                <div className='AddProduct' onClick={() => setService("addProduct")} >
                    <div><BsFillCartPlusFill className={services.addProduct ? 'admin-icon-active' : 'admin-icon'}/></div>
                    <div>Add Product</div>
                </div>
                <div className='Categories' onClick={() => setService("categories")} >
                    <div><HiViewGrid className={services.categories ? 'admin-icon-active' : 'admin-icon'}/></div>
                    <div>Categories</div>
                </div>
                <div className='ShippingAddresses' onClick={() => setService("shippingAddresses")} >
                    <div><FaMapMarkerAlt className={services.shippingAddresses ? 'admin-icon-active' : 'admin-icon'}/></div>
                    <div>Addresses</div>
                </div>
                <div className='Users' onClick={() => setService("users")} >
                    <div><HiUserGroup className={services.users ? 'admin-icon-active' : 'admin-icon'}/></div>
                    <div>Users</div>
                </div>
                <div className='Orders' onClick={() => setService("orders")} >
                    <div><BsBagCheckFill className={services.orders ? 'admin-icon-active' : 'admin-icon'}/></div>
                    <div>Orders</div>
                </div>
            </div>
            <div className='containerAdminRight'>

                {services.products ? <Products
                    setService={setService}
                    setEditingID={setEditingID}
                    setShowErrorModal={setShowErrorModal}/>
                : null}
                {services.productEdit ? <ProductEdit
                    editingID={editingID}
                    setShowErrorModal={setShowErrorModal}/>
                : null}
                {services.addProduct ? <AddProduct setShowErrorModal={setShowErrorModal}/> : null}
                {services.categories ? <Categories setShowErrorModal={setShowErrorModal}/> : null}
                {services.shippingAddresses ? <Addresses setShowErrorModal={setShowErrorModal}/> : null}
            </div>
        </div>
    );
};