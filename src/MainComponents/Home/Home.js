import './Home.css'
import logoHome from './images/logoHome.png';
import boy1 from './images/boy-2-1.png'
import boy2 from './images/boy-2-2.png'
import children1 from './images/boy-girl1.png'
import children2 from './images/boy-girl.png'
import {Link } from 'react-router-dom';
import Carousel from './Carousel/Carousel'
import ProductLeaders from './ProductLeaders/ProductLeaders';
import Novelties from './Novelties/Novelties';

export default function Home(){
    return(
    <>
        <div className='homeCarousel'>
            <Carousel>
                <div className = "item item-1">
                    <img src={logoHome }/>
                </div>
                <div className = "item item-2">
                    <div className = "item-2-container">
                        <div>
                            <img src={boy1}/>
                        </div>
                        <div>
                            <p>Welcome to the world of toys!</p>
                        </div>
                        <div>
                            <img src={boy2}/>
                        </div>
                    </div>
                </div>
                <div className = "item item-3">
                    <div className='item-2-container'>
                        <img src={children2}/>
                        <div className='button'>
                            <Link to='/products'>
                                <button>START SHOPPING!</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
        <div className='homeNovelties'>
            <Novelties />
        </div>
        <div className='homeProductLeaders'>
            <ProductLeaders />
        </div>
    </>
    )
}

  
  
  
  