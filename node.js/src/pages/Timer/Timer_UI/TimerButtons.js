import React, { useContext } from 'react'
import { MyTimerContext } from './TimerUI'

const TimerButtons = ({ handleStart, handleStop }) => {
    const { isActive } = useContext(MyTimerContext);

    return (
        <>
            <button className='btn btn-light fw-bold px-4' style={{ color: 'inherit' }} onClick={handleStart}>
                {isActive ? 'PAUSE' : 'START'}
            </button>
            <button className='btn text-white fs-4 position-absolute fw-bold' id='stop' onClick={handleStop}>
                <i className="bi bi-stop-circle"></i>
            </button>
        </>
    )
}

export default TimerButtons