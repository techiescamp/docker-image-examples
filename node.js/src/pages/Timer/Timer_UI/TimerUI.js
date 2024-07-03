import React, { useEffect, useState, createContext, useContext, useCallback, useMemo } from 'react'
import axios from 'axios';
import { MyContext } from '../Timer';
import clickSound from '../../../assets/audio/Mouse_Click.mp3';
import clockAlarm from '../../../assets/audio/clock-alarm.mp3';
import '../Timer.css';
import config from '../../../config';
import TimerNav from './TimerNav';
import TimerButtons from './TimerButtons';
import { UserContext } from '../../../App';

export const MyTimerContext = createContext();
const apiUrl = config.apiUrl
const metrics_url = config.metrics_url;

const TimerUI = ({ finish, setFinish }) => {
    const { user, xCorrId } = useContext(UserContext);
    const { todo, setTodo } = useContext(MyContext);
    const [message, setMessage] = useState(null);
    
    let customTimer = sessionStorage.getItem('customTimer') ? JSON.parse(sessionStorage.getItem('customTimer')) : null;

    const { setCount } = useContext(MyContext);
    const [timer, setTimer] = useState(() => {
        return customTimer ? customTimer.timer * 60 : 25 * 60
    });
    const [unTask, setUnTask] = useState({});
    const [timerName, setTimerName] = useState('timer');
    const [isActive, setIsActive] = useState(false);

    const clickAudio = useMemo(()=> new Audio(clickSound),[]);
    const alarmAudio = useMemo(() => new Audio(clockAlarm),[]);

    function postMetrics(url, name) {
        axios.post(url, {timername: name})
        return;
    }

    const handleStop = useCallback(() => {
        if(clickAudio) {
            clickAudio.play();
        }
        if (timer >= 15 * 60) {
            setTimer(customTimer ? customTimer.timer * 60 : 25 * 60);
            setIsActive(false);
        } else if (timer >= 5 * 60 && timer <= 15 * 60) {
            setTimer(customTimer ? customTimer.long_break * 60 : 15 * 60);
            setIsActive(false);
        } else if (timer <= 5 * 60) {
            setTimer(customTimer ? customTimer.short_break * 60 : 5 * 60);
            setIsActive(false);
        }
        const stop = document.getElementById('stop');
        stop.style.display = 'none';
    }, [timer, customTimer, setIsActive, clickAudio]);

    useEffect(() => {
        // finds the first uncompleted task and setstate for uncomplete task
        const unCompleteTask = todo.find(t => !t.checked);
        setUnTask({ ...unCompleteTask })
        // check for completed tasks
        const newtodo = todo.filter(f => f.checked === true)
        if(newtodo.length !== 0) {
            setCount(newtodo.length);
            setFinish(newtodo)
            if(todo.length === newtodo.length) {
                setMessage("Yay you completed all tasks !!");
            }
        }
    }, [todo, setCount, setFinish])

    useEffect(() => {
        let intervalId;
        // if active start timer
        if (isActive) {
            // set timer itnerval of 1sec
            intervalId = setInterval(() => {
                setTimer(prev => prev > 0 ? prev - 1 : 0)
            }, 1000);
            if (timer === 0 && timerName === 'timer') {
                let newtodo;
                // increase 'act' count if repeated
                newtodo = { 
                    ...unTask, 
                    act: Number(Number(unTask.act) + 1), 
                    timer: Number(customTimer.timer) || 25
                }
                setUnTask({ ...newtodo })
                // replace original todos with new "added act" using 'map' function
                const tos = todo.map(item => {
                    if (item.id === newtodo.id) {
                        return newtodo
                    }
                    return item
                });
                sessionStorage.setItem('todo', JSON.stringify(tos))
                setTodo(tos);
                alarmAudio.play();
                handleStop();
            } else if(timer === 0 && timerName === 'short') {                
                postMetrics(`${metrics_url}`, 'short')
                alarmAudio.play();
                handleStop(); 
            } else if(timer === 0 && timerName === 'long') {
                postMetrics(`${metrics_url}`, 'long')
                alarmAudio.play();
                handleStop();
            }
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [isActive, timer, customTimer, handleStop, alarmAudio, setTodo, timerName, todo, unTask])

    useEffect(() => {
        // set date and finished tasks
        sessionStorage.setItem('date', JSON.stringify(new Date().toLocaleString('en-US').split(", ")[0]))
        // task info
        if (finish.length !== 0 && user) {
            try {
                axios.post(`${apiUrl}/createTask`, {
                    date: JSON.parse(sessionStorage.getItem('date')),
                    userData: user,
                    userTasks: finish,
                }, {
                    headers: {
                        'x-correlation-id': xCorrId
                    }
                })
            } catch(err) {
                setMessage(err.message)
            }       
        }
    }, [finish, user, xCorrId])

    const handleStart = () => {
        const stop = document.getElementById('stop');
        stop.style.display = 'inline-block';
        if(clickAudio) {
            clickAudio.play();
        }
        setIsActive(prev => !prev);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60
        const timeFormat = `${String(minutes)}:${String(seconds).padStart(2, '0')}`
        return timeFormat
    }

    return (
        <MyTimerContext.Provider value={{ isActive, setIsActive, setTimer, setTimerName }}>
            <div className='my-2 w-100 text-center'>
                {message && 
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{message}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
                {/* timer navigation buttons */}
                <TimerNav />

                {/* Display timer */}
                <h1 className='m-4 text-white fw-semibold' id='timer-display'>
                    {formatTime(timer)}
                </h1>
                
                <TimerButtons handleStart={handleStart} handleStop={handleStop} />
            </div>
        </MyTimerContext.Provider>
    )
}

export default TimerUI;