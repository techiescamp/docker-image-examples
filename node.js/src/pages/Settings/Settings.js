import React, { useContext, useState, useEffect } from 'react';
import './settings.css'
import { UserContext } from '../../App';
import config from '../../config';

const apiUrl = config.apiUrl

const Settings = () => {
    const { user, xCorrId } = useContext(UserContext);
    console.log(user);

    const [profile, setProfile] = useState({
        displayName: user ? user.displayName : null,
        email: user ? user.email : null,
        password: '',
        avatar: user ? user.avatar : null,
        msg: ''
    });
    const [customTime, setCustomTime] = useState({
        timer: 25,
        short_break: 5,
        long_break: 15
    })
    const [msg, setMsg] = useState('')
    const [isNotify, setIsNotify] = useState(false)

    const handleProfile = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value})
    }

    const handleForm = async (e) => {
        e.preventDefault();
        if(profile.password !== '') {
            alert("Are you sure to change to new password ?")
        }
        fetch(`${apiUrl}/user/updateUser?email=${user.email}`, {
            method: 'POST',
            headers: { 
                'x-correlation-id': xCorrId, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(profile)
        })
        .then(res => res.json())
        .then(data => {
            setProfile({
                displayName: data.displayName,
                email: data.email,
                password: '',
                avatar: user.avatar,
                msg: data.message
            })
            sessionStorage.setItem('userInfo', JSON.stringify({
                avatar: data.result.avatar,
                displayName: data.result.displayName,
                email: data.result.email    
            }));
        })
        closeBtn()
    }

    const handleTimer = (e) => {
        setCustomTime({...customTime, [e.target.name]: e.target.value})
    }

    const handleTimerForm = (e) => {
        e.preventDefault()
        sessionStorage.setItem('customTimer', JSON.stringify(customTime));
        setMsg("Updated timer successfully")
        closeBtn()
    }

    function closeBtn() {
        setIsNotify(true);
        setTimeout(() => {
            setIsNotify(false)
        },2000)
    }


    return (
        <div className='container my-5 py-3'>
            <div className='border border-2 rounded-3 p-3 mb-3'>
                <h5 className='font-bold mb-4'>Change Profile</h5>

                {profile.msg ? 
                <p className='close bg-success-subtle p-2 text-success rounded-3 d-flex justify-content-between'>
                    {profile.msg} 
                    <span className='me-5' onClick={closeBtn}>x</span>
                </p>
                : null}

                <form onSubmit={handleForm}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Username</span>
                        <input type="text" className="form-control" value={profile.displayName} name='displayName' onChange={handleProfile} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Email</span>
                        <input type="email" className="form-control" value={profile.email} disabled/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Change Password</span>
                        <input type="password" className="form-control" value={profile.password} name='password' onChange={handleProfile} />
                    </div>
                    <button className='btn btn-success'>Save Profile</button>
                </form>
            </div>

            {/* timer */}
            <div className='border border-2 rounded-3 p-3 mb-3'>
                <h5 className='mb-4'>Customize Timer</h5>

                {isNotify && msg ? 
                <p className={`notification ${isNotify ? 'visible' : 'hidden'} bg-success-subtle p-2 text-success font-semibold rounded-3 d-flex justify-content-between`}>
                    {msg} 
                </p>
                : null}

                <form onSubmit={handleTimerForm}>
                    <div className="d-flex align-items-center mb-3 w-md-75">
                        <span className="input-group-text me-3">Timer</span>
                        <input type="number" className="form-control me-3 w-25" value={customTime.timer} name='timer' onChange={handleTimer} />
                        <span>Min</span>
                    </div>
                    <div className="d-flex align-items-center mb-3 w-md-75">
                        <span className="input-group-text me-3">Short Break</span>
                        <input type="number" className="form-control me-3 w-25" value={customTime.short_break} name='short_break' onChange={handleTimer} />
                        <span>Min</span>
                    </div>
                    <div className="d-flex align-items-center mb-3 w-md-75">
                        <span className="input-group-text me-3">Long Break</span>
                        <input type="number" className="form-control me-3 w-25" value={customTime.long_break} name='long_break' onChange={handleTimer} />
                        <span>Min</span>
                    </div>
                    <button className='btn btn-success'>Save Changes</button>
                </form>
                
            </div>
        </div>
    )
}

export default Settings;