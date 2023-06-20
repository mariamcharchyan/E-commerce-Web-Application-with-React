import './Aboute.css'
import baby from './baby-gif.gif'
import bear from './bear.gif'

export default function Aboute () {
    return(
        <div className='Aboute'>
            <div className='aboute-container'>
                <div className='aboute-container1'>
                    <div>
                        <img src={baby}/>
                    </div>
                    <div>
                        <p>Welcome to TOY WORLD! We are excited to share our story about our shop.  We are conscious of our bringing in the best quality and product that can define our loved ones.</p>
                        <p>We want to share with you the best and want you to know that our value is all about baby. Whether you choose a product at our store for your own or a gift, we ensure that you will be getting the best of the best and what is best for the baby.</p>
                    </div>
                </div>
                <div className='aboute-container2'>
                    <div>
                        <p>Our Philosophy:</p>
                        <p>At TOY WORLD, we are not only selling products but we really want to help and donate to communities and children in need. We will donate our profit to selected hospitals/organizations to help children in need every month. We want to be able to be transparent with our customers in doing, and we will always update our donations with everyone.</p>
                        <p>Please don’t forget to follow us on Instagram for daily updates on our products, our stories, and about baby!</p>
                    </div>
                    <div>
                        <img src={bear}/>
                    </div>
                </div>
            </div>
        </div>
    );
}