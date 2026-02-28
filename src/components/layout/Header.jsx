import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { getCookie } from '../../utils/cookies';

import logo from '../../../assets/seha_logo-m9JsokyV.svg';

const Header = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const activeKey = location.pathname === "/" ? "1" :
        location.pathname === "/submit" ? "2" :
            location.pathname === "/inquiry" ? "3" : "1";

    return (
        <Navbar collapseOnSelect expand="lg" className="header" variant="light">
            <div className="nav-container">
                <Navbar.Brand as={Link} to="/" className="d-lg-none sm-logo">
                    <Image className="logo" src={logo} alt="logo" />
                </Navbar.Brand>

                <div className="d-lg-none d-xl-none justify-content-end menu">
                    <Navbar.Toggle className="d-inline-flex menu-img" aria-controls="responsive-navbar-nav" />
                </div>

                <Navbar.Collapse id="responsive-navbar-nav" className="white justify-content-between">
                    <Nav className="justify-content-between" activeKey={activeKey}>
                        <Navbar.Brand as={Link} to="/" className="d-none d-lg-block">
                            <Image className="logo" src={logo} alt="logo" />
                        </Navbar.Brand>
                        <Nav.Link eventKey="1" as={Link} to="/" className="link">الرئيسية</Nav.Link>
                        <Nav.Link eventKey="2" as={Link} to="/submit" className="link">تقديم إجازة</Nav.Link>
                        <Nav.Link eventKey="3" as={Link} to="/inquiry" className="link">تتبع الطلب</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;
