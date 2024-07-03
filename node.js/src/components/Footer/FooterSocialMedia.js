import React from 'react'
import { Link } from 'react-router-dom' 


const FooterSocialMedia = () => {
    return (
        <div className='f3 col-12 col-lg-2 m-0'>
            <ul className='list-unstyled d-flex justify-content-center justify-content-lg-evenly'>
                <li className='me-4'><Link data-bs-toggle='tooltip' data-bs-title='Facebook'><i className="bi bi-facebook"></i></Link></li>
                <li className='me-4'><Link><i className="bi bi-github"></i></Link></li>
                <li className='me-4'><Link><i className="bi bi-linkedin"></i></Link></li>
            </ul>
        </div>
    )
}

export default FooterSocialMedia