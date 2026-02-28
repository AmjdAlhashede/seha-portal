import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Navbar, Nav, Image, Container } from 'react-bootstrap';
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
        <Navbar collapseOnSelect expand="lg" className="header glass-effect py-3 px-lg-5 shadow-sm" variant="light">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Image className="logo" src={logo} alt="logo" style={{ height: '45px', width: 'auto' }} />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none" />

                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="gap-lg-4 mt-3 mt-lg-0" activeKey={activeKey}>
                        <Nav.Link eventKey="1" as={Link} to="/" className="fw-bold px-3 py-2 rounded-pill transition-all">الرئيسية</Nav.Link>
                        <Nav.Link eventKey="2" as={Link} to="/submit" className="fw-bold px-3 py-2 rounded-pill transition-all">تقديم إجازة</Nav.Link>
                        <Nav.Link eventKey="3" as={Link} to="/inquiry" className="fw-bold px-3 py-2 rounded-pill transition-all text-primary">تتبع الطلب</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
