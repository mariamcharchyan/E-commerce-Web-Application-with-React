import './Carousel.css';
import { useState, useEffect, Children, cloneElement} from 'react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

const PAGE_WIDTH = 1200

const Carousel = ({children}) => {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)

    const handleLeftArrowClik = () => {
        console.log('handleLeftArrowClik');
        setOffset((currentOffset)=>{
            const newOffset = currentOffset+PAGE_WIDTH
            // console.log(newOffset);
            // return newOffset
            return Math.min(newOffset, 0)
        })
    }

    const handleRighttArrowClik = () => {
        console.log('handleRighttArrowClik');
        setOffset((currentOffset)=>{
            const newOffset = currentOffset-PAGE_WIDTH
            const maxOffset = -(PAGE_WIDTH * (pages.length-1))
            // console.log(newOffset);
            // return newOffset
            return Math.max(newOffset, maxOffset)
        })
    }

    useEffect(() => {
        setPages(
            Children.map(children ,child => {
                return cloneElement(child, {
                    style:{
                        height:'100%',
                        minWidth: `${PAGE_WIDTH}px`,
                        maxWidth: `${PAGE_WIDTH}px`,
                    }
                })
            })
        )
    },[])

    return(
        <div className="home">
            <div className="home-container">
                <FaChevronLeft className='arrow' onClick={handleLeftArrowClik}/>
                <div className="window">
                    <div className="all-pages-container"
                    style={{
                        transform: `translateX(${offset}px)`
                    }}
                    >{pages}</div>
                </div>
                <FaChevronRight className='arrow' onClick={handleRighttArrowClik}/>
            </div>
        </div>
    )
}
export default Carousel