import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import '../Timer.css';

const TaskButtons = ({ form, isUpdate, handleChange, handleEditInputChange }) => {
    const [noteOpen, setNoteOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);

    return (
        <>
            <div className='d-flex justify-content-center'>
                <Button variant='light text-decoration-underline me-3' 
                    onClick={() => setNoteOpen(!noteOpen)} 
                    aria-expanded={noteOpen} 
                    aria-controls='note'
                >
                    + Add Note
                </Button>
                <Button variant='light text-decoration-underline' 
                    onClick={() => setProjectOpen(!projectOpen)} 
                    aria-expanded={projectOpen} 
                    aria-controls='project'
                >
                    + Add Project
                </Button>
            </div>

            {/* add note */}
            <Collapse in={noteOpen}>
                <div id='note'>
                    <textarea 
                        className='form-control m-2' 
                        rows='6' 
                        value={form.description} 
                        name='description' 
                        placeholder='Description' 
                        onChange={isUpdate ? handleEditInputChange : handleChange}>    
                    </textarea>
                </div>
            </Collapse>

            {/* add project */}
            <Collapse in={projectOpen}>
                <div id='project'>
                    <input 
                        className='form-control' 
                        value={form.project_title} 
                        name='project_title' 
                        onChange={isUpdate ? handleEditInputChange : handleChange} 
                        placeholder='Project Title' 
                    />
                </div>
            </Collapse>
        </>

    )
}

export default TaskButtons;