import React, {useState} from 'react'
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom"
import {Text} from "@mantine/core";

import '../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import logo from "../../res/images/logo.png";

import {useUploader} from "../upload/UploadContext";


function AppMenu(){

    const uploader = useUploader()
    const [progress, setProgress] = useState(0)
    const [showProgress, setShowProgress] = useState(false)

    uploader.on("progress", (p) => {
        setShowProgress(p > 0 && p < 100)
        setProgress(p)
    })

    return (
        <div>
            <Navbar
                bg="dark"
                variant="dark"
                fixed="top"
                expand="sm"
                collapseOnSelect
            >
                <Navbar.Brand>
                    <img src={logo}  style={{marginLeft: 15, marginRight: 5}}width="30px" height="30px"  />{' '}
                    civitas
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link eventKey={1} as={Link} to="/">Cockpit</Nav.Link>
                        <Nav.Link eventKey={2} as={Link} to="/files">Files</Nav.Link>
                        {showProgress && <Text size="sm" color="grey">{progress}%</Text>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AppMenu