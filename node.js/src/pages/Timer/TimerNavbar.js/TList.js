import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import html2pdf from 'html2pdf.js';
import config from '../../../config';
import axios from 'axios';

const metrics_url = config.metrics_url;

const TList = ({user, show, setShow, list}) => {
    const handleClose = () => setShow(false);

    const downloadbtn = async () => {
        const tb = document.getElementById('tableList');
        var options = {
            filename: 'pomodoro_reports.pdf',
            margin: [10, 10, 10, 10],
            image: {
                type: 'png',
                quality: 0.98
            },
            jsPDF: {
                orientation: 'potrait',
                unit: 'pt',
                format: 'a4'
            },
            html2canvas: {
                scale: 2
            }
        }
        html2pdf().set(options).from(tb).save();
        await axios.post(`${metrics_url}`, { download: 'download' })
        return;
    }

    return (
        <Modal id='mtableList' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Your tasks list</Modal.Title>
                <Button variant='none' className='mx-5 btn-outline-primary' onClick={downloadbtn}>Download</Button>
            </Modal.Header>

            {!user && <p className='text-secondary text-center fs-4 fw-semibold py-2'>! Please login to view your reports</p>}

            <Modal.Body id='tableList'>
                <h4 className='text-center text-decoration-underline mb-4'>Focus Report</h4>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Focus time</th>
                            <th>Project</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list && list.userTasks.map(t => {
                            return (
                                <tr key={t.date}>
                                    <td>{t.date}</td>
                                    <td>
                                        <ul style={{listStyle: 'none', padding: 0}}>
                                            {t.tasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.title ? task.title : '-'}</li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul style={{listStyle: 'none', padding: 0}}>
                                            {t.tasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.act ? task.act*Number(task.timer) : 0}<span> min</span></li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul style={{listStyle: 'none'}}>
                                            {t.tasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.project_title ? task.project_title : `Project Title-${task.title}`}</li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul style={{listStyle: 'none'}}>
                                            {t.tasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.description ? task.decription : `task Description-${task.title}`}</li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default TList