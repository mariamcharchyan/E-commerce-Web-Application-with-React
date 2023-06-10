import './CRUDcategory.css';
import { useState, useEffect } from 'react';

export default function CRUDcategoryItem({category, setRefresh, refresh, setShowErrorModal}){
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
        fetch(`http://localhost:3000/category/delete/${id}`, {
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
                <div className='editCategory'><button onClick={()=>{setIsEditing(false)}}>EDIT</button></div>
                <div className='deleteCategory'><button onClick={()=>{handleDeleteCategory(category.id);}}>DELETE</button></div>
            </>
            :
            <>
                <div className='getCategoryName'><input type='text' value={catNameUpdate} onChange={(event) => setCatNameUpdate(event.target.value)} /></div>
                <div className='updateCategory'><button  onClick={()=>{handleUpdateCategory(category.id, catNameUpdate); setIsEditing(true);}}>UBDATE</button></div>
                <div className='cancelCategory'><button onClick={()=>{setIsEditing(true); setRefresh(!refresh)}}>CANCEL</button></div>
            </>
            }

        </div>
    );
};