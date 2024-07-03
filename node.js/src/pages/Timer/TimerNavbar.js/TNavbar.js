import React, { useEffect, useState, useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import config from '../../../config';
import TList from './TList';
import TReport from './TReport';
import { UserContext } from '../../../App';
import { MyContext } from '../Timer';

const apiUrl = config.apiUrl;

const TNavbar = () => {
    // context
    const { user, xCorrId } = useContext(UserContext)
    const { count } = useContext(MyContext)

    // list modal
    const [show, setShow] = useState(false);
    const [list, setList] = useState(null);
    const handleShow = () => setShow(true);

    // report modal
    const [report, setReport] = useState(false)
    const handleReport = () => setReport(true);

    useEffect(() => {
        if (user) {
            axios.post(`${apiUrl}/tasks`, user, {
                headers: {
                    'x-correlation-id': xCorrId
                }
            })
            .then(res => {
                setList(res.data)
            })
        }
    },[user, count])

    return (
        <div className='mb-5'>
            <Nav className='container-fluid p-md-2 justify-content-center flex-nowrap position-absolute top-0 start-0' id='timerNavigation'>
                <Nav.Item>
                    <Nav.Link className='rounded-pill fw-medium py-1 px-5' onClick={handleShow}>
                        Task List
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='rounded-pill fw-medium py-1 px-5' onClick={handleReport}>
                        Task Report
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* modal */}
            <TList user={user} show={show} setShow={setShow} list={list} />

            {/* modal report */}
            <TReport user={user} report={report} setReport={setReport} list={list} />
        </div>
    )
}

export default TNavbar