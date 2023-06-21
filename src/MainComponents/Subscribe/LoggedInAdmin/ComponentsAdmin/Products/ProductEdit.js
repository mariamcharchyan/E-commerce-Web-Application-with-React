import './Products.css';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';

export default function ProductEdit({editingData,editing,setEditing}){
    // const [editing, setEditing] = useState(false);
    const handleUpdateProduct = () => {
        setEditing(!editing);
    }
    return (
        <div className='getProductItem'>
            <div className='getProductImage'>
                <img src={`http://localhost:5000/${editingData.image[0].imagePath}`} alt="Image" />
            </div>
            <div className=''>{editingData.name}</div>
            <div className=''>{editingData.price}</div>
            <div className=''>
                <div className=''>ed</div>
                <button onClick={handleUpdateProduct}>dddd</button>
                <div className='' onClick={handleUpdateProduct}>del</div>
            </div>
        </div>
    );
};