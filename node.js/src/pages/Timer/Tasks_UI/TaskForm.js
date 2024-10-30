import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Timer';
import TaskButtons from './TaskButtons';
import '../Timer.css';
import config from '../../../config';
import axios from 'axios';
import { UserContext } from '../../../App';

const apiUrl = config.apiUrl;
const metrics_url = config.metrics_url;

const TaskForm = ({ form, setForm, isUpdate, setIsUpdate }) => {
    const { todo, setTodo } = useContext(MyContext);
    const { user, xCorrId } = useContext(UserContext);
    
    const todayDate = JSON.parse(sessionStorage.getItem('date'));
    const checkedTasks = sessionStorage.getItem('checkedTasks') ? JSON.parse(sessionStorage.getItem('checkedTasks')) : [];
    const todaysTask = sessionStorage.getItem('todaysTask') ? JSON.parse(sessionStorage.getItem('todaysTask')) : [];

    useEffect(() => {
         // if user logged again today ? integrate old tasks to today's tasks 
        if(user) {
            axios.post(`${apiUrl}/checkTodayTasks`, 
                {date: todayDate, email: user.email}, {
                headers: {
                    'x-correlation-id': xCorrId 
                }
            })
            .then(res => {
                // if(checkedTasks || todaysTask) {
                    const combinedTasks = [...res.data, ...checkedTasks, ...todaysTask];
                    const uniqueTask = combinedTasks.filter((obj, index) => index === combinedTasks.findIndex(o => o.id === obj.id)) 
                    console.log('todays-task: ', uniqueTask);
                    sessionStorage.setItem('todaysTask', JSON.stringify(uniqueTask))
                // }
                // if(checkedTasks) {
                //     sessionStorage.setItem('todaysTask', JSON.stringify([...res.data, ...checkedTasks]))
                // } else {
                //     sessionStorage.setItem('todaysTask', JSON.stringify([...res.data]))
                // }
            })
            
        }
    },[todayDate, checkedTasks, todaysTask, user])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function generateUniqueId() {
        const timestamp = Date.now().toString(36)
        const randString = Math.floor(Math.random().toString(8));
        return `T${timestamp + randString}`
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo) {
            const newTodo = {
                ...form,
                id: generateUniqueId(), // Assigning sequential id based on the length of the todo array
            };
            setTodo(todo ? [...todo, newTodo] : [newTodo]);
            sessionStorage.setItem('todo', JSON.stringify(todo ? [...todo, newTodo] : [newTodo]));
        }
        setForm({
            title: '',
            description: '',
            project_title: '',
            act: 0,
            checked: false
        });
        // Increment the taskCreatedCounter
        try {
            axios.post(`${metrics_url}`, {timername: 'timer'});
            return;
        } catch (error) {
            console.error('Error incrementing task counter:', error);
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const newTodo = todo.map(i => {
            if(i.id === form.id) {
                const updateForm = form;
                return updateForm
            }
            return i
        })
        setTodo(newTodo)
        sessionStorage.setItem('todo', JSON.stringify(newTodo));
        setIsUpdate(false)
        setForm({
            title: '',
            description: '',
            project_title: '',
            act: 0,
            checked: false
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        let taskform = document.getElementById('taskform');
        let addBtn = document.getElementById('addBtn');
        addBtn.style.display = 'block';
        taskform.style.display = 'none';
    }

    const handleEditInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
            <div className='bg-light text-dark p-3 mb-3 rounded-2' id='taskform'>
                <form id='formElement'>
                    <input
                        className='form-control bg-secondary-subtle mb-3'
                        value={form.title}
                        name='title'
                        onChange={isUpdate ? handleEditInputChange : handleChange}
                        placeholder='What are you working for?'
                    />
                    {/* add acts */}
                    <div className='d-flex align-items-center'>
                        <input type='number' 
                            className='form-control w-25 me-2' name='act' 
                            value={Number(form.act) ? Number(form.act) : 0} 
                            placeholder={Number(0)}
                            onChange={isUpdate ? handleEditInputChange : handleChange} 
                        />
                        <span className='fs-3 me-2'> / </span>
                        <input type='number' className='form-control w-25 me-2' name='act-1' value={1} disabled />
                        <span className='me-2'>Act</span>
                    </div>

                    <TaskButtons 
                        form={form}
                        isUpdate={isUpdate}
                        handleChange={handleChange}
                        handleEditInputChange={handleEditInputChange}
                    />

                    {/* cancel, submit button */}
                    <div className='text-md-end mx-5 mt-3' id='task-btn'>
                        <button className='btn btn-light me-3' onClick={handleCancel}>Cancel</button>
                        <button className='btn btn-dark' type='submit' onClick={isUpdate ? handleUpdate : handleSubmit}>
                            {isUpdate ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
    )
}

export default TaskForm