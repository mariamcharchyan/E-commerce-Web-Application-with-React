import './PaymentCards.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import mastercardIcon from './images/mastercardIcon.png';
import addCardIcon from './images/addCardIcon.png';
import right from './images/right.png';
import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';


export default function PaymentCards(){

    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('token');
    const storedCardData = JSON.parse(localStorage.getItem('cardData'));
    const isVerified = localStorage.getItem('isVerified');


    const [cards, setCards] = useState([]);
    const [refresh, setRefresh] = useState(false);
   
   //for protect  to the /user url 
   const navigate = useNavigate();

   useEffect(() => {
    if(accessToken){
        const decoded = jwt_decode(accessToken)
        const status = decoded.status
        if(status !=='user'){
            navigate("/login")
        } else if(!isVerified){
            navigate("/loggedin/user")
        }
    } else {
        navigate("/login")
    }
    },[])

    const hendleDeleteCard = (id) => {
        fetch(`http://localhost:5000/savedCard/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRefresh(!refresh);
            if (storedCardData?.id === id){
                localStorage.setItem('cardData', null);
            }
        })
        .catch(error => {
            // setShowErrorModal(true);
            console.error(error);
        })
    };
 
    useEffect(() => {   
        fetch(`http://localhost:5000/savedCards/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        })
        .then(response => response.json())
        .then(dataCards => {
            console.log(dataCards.userSavedCards);
            setCards(dataCards.userSavedCards)
            // const newDataCategories = dataCategories.map(data => ({ id: data.id, name: data.name }));
            // setCategories(newDataCategories);
        })
        .catch(error => {
            // setShowErrorModal(true);
            console.error(error);
        })
    },[refresh]);
    

    return (
        <div className='cards'>
            <div className='cardsTitle'> 
                <h3>Payment Cards</h3>
            </div>
            {cards.map((card) => (
            <div key={card.id}  className={`${storedCardData?.id === card.id ? 'selectedCard' : 'card'}`}>
                <div>
                    <img src={mastercardIcon} alt=""/>
                </div>
                <div className='cardnumber'
                    onClick={() => {
                        const cardData = JSON.stringify({
                            id: card.id,
                            cardNumber: card.cardNumber,
                            cardExpiry: card.cardExpiry
                        });
                        localStorage.setItem('cardData', cardData);
                        setRefresh(!refresh); 
                    }}
                >{card.cardNumber}</div>
                <div >{card.cardExpiry}</div>
                <div><button onClick={() => {
                    hendleDeleteCard(card.id);
                    }}>X</button></div>
            </div>
            ))}
            <div className='addPaymentCard'>
                <div>
                    <img src={addCardIcon} alt=""/>
                </div>
                <div>Bind a new card</div>
                <div>
                    <Link to="/user/cards/binding" style={{ textDecoration: 'none', color: 'inherit' }}> 
                        <img className='image' src={right} alt=""/>
                    </Link>
                </div>
            </div>
        </div>
    );
};