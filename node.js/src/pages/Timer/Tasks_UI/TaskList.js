import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import '../Timer.css';

const TaskList = ({ todo, setTodo, handleEdit }) => {
    const handleChecked = (id) => {
        const updatedCheck = todo.map(t => t.id === id ? { ...t, checked: !t.checked } : t)
        setTodo(updatedCheck)
        sessionStorage.setItem('todo', JSON.stringify(updatedCheck))
    }

    const handleDelete = (id) => {
        const updateTodo = todo.filter(t => t.id !== id)
        setTodo(updateTodo)
    }

    return (
        <ListGroup>
            {todo ? todo.map(item => {
                return (
                <ListGroup.Item key={item.id} className='mb-2 align-items-center'>
                    <Dropdown id='dropdown-task'>
                        <Dropdown.Toggle variant="light" className='bg-none'><i className="bi bi-three-dots-vertical"></i></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleDelete(item.id)}>Clear task</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEdit(item.id)}>Edit task</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {item.act ? <p className='act'>{item.act}/1</p> : <p className='act'>0/1</p>}

                    {item.title ?
                        <Form.Check className='text-start mb-2' type='checkbox'>
                            <Form.Check.Input type='checkbox'
                                className='border border-secondary'
                                checked={item.checked}
                                name='checked'
                                onChange={() => handleChecked(item.id)}
                                disabled={item.checked}
                            />
                            <Form.Check.Label
                                style={{ textDecoration: item.checked ? 'line-through' : 'none' }}
                            >
                                {item.title}
                            </Form.Check.Label>
                        </Form.Check>
                        : null
                    }
                    {item.description ?
                        <p className='descript mb-1'>{item.description}</p>
                     : null
                    }
                    {item.project_title ?
                        <p className='project'>{item.project_title}</p>
                    : null
                    }
                </ListGroup.Item>
                )
             }) : null }
        </ListGroup>
    )
}

export default TaskList