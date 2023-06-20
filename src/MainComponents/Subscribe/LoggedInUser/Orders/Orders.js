import './Orders.css';
import { Link } from 'react-router-dom';
import { useParams} from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Orders(){

  const [orders, setOrders] = useState([]);
  console.log(orders);

  const accessToken = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  useEffect(() => {   
    fetch(`http://localhost:5000/orders/${userId}?offset=0&limit=50`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setOrders(data);
    })
    .catch(error => {
    // setShowErrorModal(true);
      console.error(error);
    })
  },[]);


    return (
        <div className='user-orders'>
            <div className='user-ordersTitle'>
                <h3>My Orders</h3>
            </div>
            <div className='user-ordersMain'>
                {orders.slice().reverse().map((order) => (
                <div className='user-order' key={order.id}>
                    <Link to={`/user/orders/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className='user-order-main'>
                        <div>
                            <div><FaMapMarkerAlt /></div>
                            <div>{order.shippingAddress.address}, {order.shippingAddress.state}</div>
                        </div>
                        <div>{new Date(order.updatedAt).toISOString().substr(0, 10)}</div>
                    </div>
                    </Link>
                </div>
                ))}
            </div>
        </div>
      );
    }