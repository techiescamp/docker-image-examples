import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';

const apiUrl = config.apiUrl;

const Signup = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [userDetails, setUserDetails] = useState({
        displayName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const cid = `pomo-${Math.ceil(Math.random()*200)}`;
        fetch(`${apiUrl}/user/signup`, {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'x-correlation-id': cid,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setStatus(data);
                if(data.success === true) {
                    sessionStorage.setItem('xCorrId', data.xCorrId)
                    navigate("/login")
                }
            });

        setUserDetails({
            displayName: '',
            email: '',
            password: ''
        })
    }

    const registerGoogle = () => {
        window.open(`${apiUrl}/auth/google`, "_self");
    }

    const inlineStyle = {
        color: getColor(),
        borderRadius: '10px',
        padding: '5px'
    }
    function getColor() {
        if (status.success === true) {
            return 'green'
        } else {
            return 'red'
        }
    }

    return (
        <main className='main-container text-center'>
            <div className="form-container mx-auto pt-5">
                <div className='form-wrapper mx-auto border border-outline-secondary p-2 bg-light'>
                    <h3 className='m-3'>SIGN UP FORM</h3>
                    {status ? <p style={inlineStyle}>{status.message} !</p> : null}

                    <form onSubmit={handleSubmit}>
                        <div className='w-75 mx-auto'>
                            <input
                                type='text'
                                name='displayName'
                                value={userDetails.displayName}
                                onChange={handleChange}
                                className='form-control mb-3 border border-secondary rounded-1'
                                placeholder='Your Full name'
                                required
                            />
                            <input
                                type='email'
                                name='email'
                                value={userDetails.email}
                                onChange={handleChange}
                                className='form-control mb-3 border border-secondary rounded-1'
                                placeholder='Enter your email'
                                required
                            />
                            <input
                                type='password'
                                name='password'
                                value={userDetails.password}
                                onChange={handleChange}
                                className='form-control mb-3 border border-secondary rounded-1'
                                placeholder='Enter your password'
                                required
                            />
                            <p className='text-start' style={{ fontSize: '12px' }}>
                                By signing up, I accept the PomodoroApp <Link to='/termsConditions'>Terms of Service </Link>
                                and acknowledge the <Link to='/privacyPolicy'>Privacy Policy.</Link>
                            </p>
                            <button className='btn btn-primary w-100'>Sign up</button>
                        </div>
                    </form>

                    <p className='m-3'>Or continue with:</p>

                    <div className='w-75 mx-auto'>
                        <button className='btn btn-outline-secondary w-100 mb-3 social-btn' onClick={registerGoogle}>
                            <i className="bi bi-google text-danger me-2"></i> Google
                        </button>
                    </div>

                    <p>Already have an account ? <Link to='/login'>Login here</Link></p>

                    <hr className='w-50 mx-auto' />

                    <div>
                        <h4 className='mb-3 text-danger fw-bold'>Pomodoro</h4>
                        <p className='small'>Privacy Policy <span>.</span> User Notice</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Signup