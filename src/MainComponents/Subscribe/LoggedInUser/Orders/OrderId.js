import './OrderId.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


export default function OrderId() {
  const { id } = useParams();

  const [order, setOrder] = useState([]);
  console.log(order);

  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:5000/orderItems/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setOrder(data);
    })
    .catch(error => {
    // setShowErrorModal(true);
      console.error(error);
    })
  }, []);

    let totalPrice = 0;
    let quantity = 0;
    order?.forEach((item) => {
        totalPrice += item.quantity * item.orderItemData.price;
        quantity += item.quantity;
    });

    console.log(totalPrice, quantity);

  return (
        <div className="orders-id">
            <h2 className="orders-items-title">Order number</h2>
            <h2 className="orders-items-title">Order date</h2>
            <div className="order-items">
                <div className="order-items-header">
                    <div className="item-number"><b>N</b></div>
                    <div className="item-image"></div>
                    <div className="item-description"><b>Description</b></div>
                    <div className="item-price"><b>Price ($)</b></div>
                    <div className="item-quantiti"><b>Quantiti</b></div>
                </div>
                {order?.map((item,index) => (
                <div className="order-items-main" key={item.id}>
                    <div className="item-number">{index+1}</div>
                    <div className="item-image">
                        <img className="cart-items-image" 
                            src={`http://localhost:5000/${item?.orderItemData?.productImages?.[0].imagePath}`} 
                            alt={item.name}
                        />
                    </div>
                    <div className="item-name">{item.orderItemData.name}</div>
                    <div className="item-price">{item.orderItemData.price}</div>
                    <div className="item-quantiti">{item.quantity}</div>
                </div>
                ))}
                <div className="order-items-footer">
                    <div className="item-number"></div>
                    <div className="item-image"></div>
                    <div className="item-name"><b>That's all:</b></div>
                    <div className="item-price"><b>{totalPrice}</b></div>
                    <div className="item-quantiti"><b>{quantity}</b></div>
                </div>
            </div>
        </div>
  );
}