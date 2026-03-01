import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Navbar, Nav, Image, Container } from 'react-bootstrap';

import logo from '../../../assets/seha_logo-m9JsokyV.svg';

const Header = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeKey = location.pathname === "/" ? "1" :
        location.pathname === "/submit" ? "2" :
            location.pathname === "/inquiry" ? "3" : "1";

    return (
        <Navbar collapseOnSelect expand="lg" className={`header ${scrolled ? 'glass-effect py-2 shadow-sm' : 'bg-transparent py-4'} transition-all`} style={{ transition: 'all 0.3s ease-in-out', zIndex: 1030 }} variant="light">
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
