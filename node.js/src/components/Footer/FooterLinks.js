import React from 'react'
import { Link } from 'react-router-dom' 


const FooterLinks = () => {
    return (
        <div className='f2 col-12 col-lg-5 row p-2 pt-lg-4 m-0'>
            <ul className='list-unstyled col ps-5'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
            </ul>
            <ul className='list-unstyled col'>
                <li><Link to='/'>About Us</Link></li>
                <li><Link to='/'>Privacy Policy</Link></li>
                <li><Link to='/'>Disclaimer</Link></li>
            </ul>
        </div>
    )
}

export default FooterLinks