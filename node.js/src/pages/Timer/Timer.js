import React, { useState, createContext, useEffect } from 'react';
import TaskUI from './Tasks_UI/TaskUI';
import TNavbar from './TimerNavbar.js/TNavbar';
import TimerContent from './TimerContent';
import TimerUI from './Timer_UI/TimerUI';
import Dropdown from 'react-bootstrap/Dropdown';
import './Timer.css';

export const MyContext = createContext();

const Timer = () => {
    const [todo, setTodo] = useState(() => {
        const storedTasks = sessionStorage.getItem('todo');
        const checkedTasks = sessionStorage.getItem('checkedTasks');
        return storedTasks ? JSON.parse(storedTasks) : JSON.parse(checkedTasks) || [];
    });
    const [loading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [finish, setFinish] = useState([]);
    const [bg, setBg] = useState('#b62525');

    useEffect(() => {
        setIsLoading(true)
    },[])

    const handleAddTask = () => {
        let taskform = document.getElementById('taskform');
        let addBtn = document.getElementById('addBtn');
        let formElement = document.getElementById('formElement');
        taskform.style.display = 'block';
        formElement.style.display = 'block';
        addBtn.style.display = 'none';
    }

    const handleClearTask = () => {
        // store checked tasks in session-storage
        const getCompleteTasks = JSON.parse(sessionStorage.getItem('checkedTasks'));
        const getTodos = todo.filter(t => t.checked === true);
        let checkedTasks;
        if(getCompleteTasks !== null) {
            checkedTasks = [...getCompleteTasks, ...getTodos]
        } else {
            checkedTasks = [...getTodos]
        }
        sessionStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
        // filter un-checked tasks and sent to list
        const newTodo = todo.filter(t => t.checked !== true)
        setTodo(newTodo)
        sessionStorage.setItem('todo', JSON.stringify(newTodo));
    }

    const handleClearAll = () => {
        setTodo([])
    }

    return (
        <MyContext.Provider value={{ todo, setTodo, count, setCount, setBg }}>
            { loading &&
            <>
                <main className='container-fluid py-5 m-0 timer-container position-relative' style={{ backgroundColor: bg }}>
                    <TNavbar />
                    
                    <div className='container mx-auto timerApp' style={{ backgroundColor: bg }}>
                        <TimerUI finish={finish} setFinish={setFinish} />

                        <div className='d-flex align-items-center flex-row justify-content-between mt-4 mx-auto w-75'>
                            <h4 className='text-white'>Tasks</h4>
                            <Dropdown>
                                <Dropdown.Toggle variant="none" className='text-white fw-bold'>. . .</Dropdown.Toggle>
                                <Dropdown.Menu className='px-2'>
                                    <Dropdown.Item onClick={handleClearTask} className='p-2'>Clear Finished Task</Dropdown.Item>
                                    <Dropdown.Item onClick={handleClearAll} className='p-2'>Clear All tasks</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <hr className='w-75 mx-auto text-white' />
                        
                        <TaskUI />

                        {/* Add task Button */}
                        <button className='btn px-5 py-2 my-4 mx-auto text-white fw-bold' id='addBtn' onClick={handleAddTask}>
                            Add Tasks
                        </button>

                        {/* Finish Button */}
                        <div className='text-start' id='finish'>
                            <p className='text-white px-3 py-2 fw-bold border border-1'>
                                Finished: {count === 0 ? 0 : count} task completed
                            </p>
                        </div>
                    </div>
                </main>
                <TimerContent />
            </>
            }
        </MyContext.Provider>
    )
}

export default Timer