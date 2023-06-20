import './Categories.css';
import CategoriesItem from './CategoriesItem';
import { useState, useEffect } from 'react';

export default function Categories({setShowErrorModal}){
    // for Authorization
    const accessToken = localStorage.getItem('token');


    // for add new category
    const [catNameAdd, setCatNameAdd] = useState('');

    // for categories data 
    const [categories, setCategories] = useState([]);
    console.log(categories);

    
    const [refresh, setRefresh] = useState(false);

    const handleAddCategory = (dataAdd) => {
        fetch(`http://localhost:5000/category/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({name: dataAdd})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRefresh(refresh);
        })
        .catch((error) => {
            if(error == 'Forbidden'){
                setShowErrorModal(true);
            }
            console.error( error);
        });
    }

    // for categories data 
    useEffect(() => {   
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
        }
        })
            .then(response => response.json())
            .then(dataCategories => {
                const newDataCategories = dataCategories.map(data => ({ id: data.id, name: data.name }));
                setCategories(newDataCategories);
            })
            .catch(error => {
                // if(error == 'SyntaxError: Unexpected token "F", "Forbidden" is not valid JSON'){
                    setShowErrorModal(true);
                // }
                console.error(error);
        })
    },[refresh]);

    return (
        <div className='CRUDcategoryContainer-0'>
            <div className='CRUDcategoryContainer'>
            <div><h2>Categories</h2></div>
            <div className='addCategory'>
                <div><h4>Add Category</h4></div>
                <div>
                    <input 
                        type='text' 
                        value={catNameAdd} 
                        placeholder="New Category Name"
                        onChange={(event) => setCatNameAdd(event.target.value)} 
                    />
                    <button 
                        onClick={()=>{
                            handleAddCategory(catNameAdd);
                            setCatNameAdd('');
                            setRefresh(!refresh);}}
                    >Add New Category</button>
                </div>
            </div>
            <div><h4>Get Category</h4></div>
            <div className='getCategory'>
                <div className='getCategoryTitle'>
                    <div className='getCategoryId'><p>id</p></div>
                    <div className='getCategoryName'><p>name</p></div>
                    <div></div>
                </div>
                {categories.map((category) => (
                   <CategoriesItem
                    key={category.id} 
                    category={category} 
                    setRefresh={setRefresh}
                    refresh={refresh}
                    setShowErrorModal={setShowErrorModal}/>
                ))}
            </div>
        </div>
        </div>
    );
};