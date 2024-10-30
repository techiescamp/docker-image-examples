import React from 'react'
import './Footer.css'
import FooterForm from './FooterForm';
import FooterLinks from './FooterLinks';
import FooterSocialMedia from './FooterSocialMedia';

const Footer = () => {

  return (
    <footer className='container-fluid w-100 p-0 m-0 row justify-content-around align-items-center'>
        <div className='f1 col-12 col-lg-4 p-2 text-start'>
            <h2 className='mb-0 ps-4 pt-2 fw-bold'>Pomodoro</h2>
            <p className='ps-4' style={{fontSize: '12px', color: 'slategrey'}}>&copy; pomodoro 2024. All rights reserved.</p>
            <FooterForm />
            <h6 className='ps-4'>Reach out to us for updates and latest news!</h6>
        </div>

        <FooterLinks />
        <FooterSocialMedia />
    </footer>
  )
}

export default Footer