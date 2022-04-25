import React from 'react'
import logo from "../../res/images/logo.svg";
import '../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom"

function AppMenu(){
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
                    <img src={logo} width="40px" height="40px" />{' '}
                    Logo
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/files">Files</Nav.Link>
                        <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AppMenu