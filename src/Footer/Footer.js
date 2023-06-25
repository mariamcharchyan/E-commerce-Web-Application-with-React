import './Footer.css';
import {FaYoutube,FaFacebook,FaGithub,FaLinkedin, FaInstagram} from 'react-icons/fa';

export default function Footer (){
    return (
        <>
        <footer>
        <div className="footer">
            <div className="col-1">
                <h4><b>USEFUL LINKS</b></h4>
                <a >About</a>
                <a >Services</a>
                <a >Contact</a>
                <a >Shop</a>
                <a >Blog</a>
            </div>
            {/* <div className="col-2">
                <h4>NEWLETTER</h4>
                <input type="email"  placeholder="Your Email Addres"/>
                <br/>
                <button type="submit">SUBSCRIBE NOW</button>
            </div> */}
            <div className="col-3">
                <h4><b>CONTACT</b></h4>
                <div className="social-icons">
                    <FaYoutube className='social-icon'/>
                    <FaFacebook className='social-icon'/>
                    <FaGithub className='social-icon'/>
                    <FaLinkedin className='social-icon'/>
                    {/* <FaInstagram className='social-icon'/> */}
                </div>
                
            </div>

        </div>
    </footer>


        </>
    )
}