import './Categories.css';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaWindowClose } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function CategoriesItem({category, setRefresh, refresh, setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');

    const [isEditing, setIsEditing] = useState(true);
    const [catNameUpdate, setCatNameUpdate] = useState(category.name);

    const handleUpdateCategory = (id, name) => {
        fetch(`http://localhost:5000/category/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({name: name})
        })
        .then(response => {
            setRefresh(!refresh);
            console.log(refresh);
            return response.json();
          })
        // .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            if(error.message == 'Forbidden'){
                setShowErrorModal(true);
            }
            console(error.message);
        });
    }
    const handleDeleteCategory  = (id) => {
        const accessToken = localStorage.getItem('token');
        fetch(`http://localhost:5000/category/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${accessToken}`
            }
        })
        .then(response => {
            setRefresh(!refresh);
            console.log(refresh);
            if (response.ok && response.status !== 204) {
                return response.json();
            } else {
                return null;
            }
        })
        .then(data => {
            if (data) {
                console.log(data);
            }
        })
        .catch((error) => {
            if(error.message == 'Forbidden'){
                setShowErrorModal(true);
            }
            console(error.message);
        });
    }


    return (
        <div className='getCategoryBodyItem'>
            <div className='getCategoryId'><p>{category.id}</p></div>
            {isEditing ?
            <>
                <div className='getCategoryName'><p>{category.name}</p></div>
                <div className='editCategory'><MdEdit className='admin-icon-edit' onClick={()=>{setIsEditing(false)}} /></div>
                <div className='deleteCategory'><RiDeleteBin6Fill className='admin-icon-delete' onClick={()=>{handleDeleteCategory(category.id);}}/></div>
            </>
            :
            <>
                <div className='getCategoryName'><input type='text' value={catNameUpdate} onChange={(event) => setCatNameUpdate(event.target.value)} /></div>
                <div className='updateCategory'><RxUpdate className='admin-icon-update' onClick={()=>{handleUpdateCategory(category.id, catNameUpdate); setIsEditing(true);}} /></div>
                <div className='cancelCategory'><FaWindowClose className='admin-icon-close' onClick={()=>{setIsEditing(true); setRefresh(!refresh)}} /></div>
            </>
            }

        </div>
    );
};