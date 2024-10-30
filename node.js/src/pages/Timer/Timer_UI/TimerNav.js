import React, { useContext } from 'react'
import { MyContext } from '../Timer';
import Nav from 'react-bootstrap/Nav';
import { MyTimerContext } from './TimerUI';


const TimerNav = () => {
    const { setBg } = useContext(MyContext)
    const { setTimer, setIsActive, setTimerName } = useContext(MyTimerContext);

    let customTimer =  sessionStorage.getItem('customTimer') ? JSON.parse(sessionStorage.getItem('customTimer')) : null;

    const handleSelect = (eventKey) => {
        switch(eventKey) {
            case '1': 
                displayFunction(customTimer ? customTimer.timer*60 : 25 * 60, '#b62525', false, 'timer')   
                break;
            case '2': 
                displayFunction(customTimer ? customTimer.short_break*60 : 5 * 60, '#643A6B', false, 'short') 
                break;
            case '3':
                displayFunction(customTimer ? customTimer.long_break*60 : 15 * 60, '#005B41', false, 'long') 
                break;
            default: 
                displayFunction(customTimer ? customTimer.timer*60 : 25 * 60, '#b62525', false, 'timer') 
                break;
        }
    }

    function displayFunction(t, color, a, tname) {
        setTimer(t)
        setBg(color)
        setIsActive(a)
        setTimerName(tname)
    }

    return (
        <Nav variant='pills' className='timer-pill pill justify-content-sm-around flex-nowrap align-items-center' id='timer-nav' defaultActiveKey={1} onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey='1' className='rounded-pill py-1 px-4'>
                    Timer
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='2' className='rounded-pill py-1 px-4'>
                    Short Break
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='3' className='rounded-pill py-1 px-4'>
                    Long Break
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default TimerNav