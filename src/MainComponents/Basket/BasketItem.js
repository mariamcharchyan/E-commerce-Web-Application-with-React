import './Basket.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBasket } from './reducerBasket';
import { useState } from 'react';

export default function BasketItem ({refreshBasket,setRefreshBasket,item,index}) {

    const [quantityUpdate, setQuantityUpdate] = useState(item.quantity);

    const hendleDelete = (id) => {
        fetch(`http://localhost:5000/basketItem/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "id": id,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRefreshBasket(!refreshBasket)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const hendleUbdate = (id, quantityUpdate) => {
        fetch(`http://localhost:5000/basketItem/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "quantity": quantityUpdate,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRefreshBasket(!refreshBasket);
            setQuantityUpdate(data.basketItem.quantity);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }



    return (
        <div className="basket-items-main" key={item.id}>
            <div className="item-number">{index+1}</div>
            <div className="item-image">
                <img className="cart-items-image" 
                    src={`http://localhost:5000/${item?.productData?.productImages?.[0].imagePath}`} 
                    alt={item.name}
                />
            </div>
            <div className="item-name">{item.productData.name}</div>
            <div className="item-price">{item.productData.price}</div>
            <div className="item-quantiti">
            <input type="number" min="1" max={item.productData.quantity}
                    value={quantityUpdate} 
                    onChange={(event) => 
                        {hendleUbdate(item.id,event.target.value)}}
                />
            </div>
            <div className="item-delete"><button 
                onClick={() => hendleDelete(item.id)}
            >X</button></div>
        </div>
    )
}