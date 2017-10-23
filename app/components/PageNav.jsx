import React from 'react'
import { Link } from 'react-router-dom';
import  {Navbar, NavItem, Nav } from 'react-bootstrap'

class PageNav extends React.Component{
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">EL Log Demo</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem ><Link to="/search">Search</Link></NavItem>
                    <NavItem ><Link to="/about">About</Link></NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default PageNav