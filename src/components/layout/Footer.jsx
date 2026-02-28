import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <Container fluid className="footer-container" style={{ background: '#0f172a', padding: '40px 0', marginTop: '60px' }}>
            <div className="footer container text-center">
                <div className="about section mb-4">
                    <h3 style={{ color: '#fff', fontWeight: '700' }}>نظام الإجازات المرضية الموحد</h3>
                    <p className="about text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        المنصة الإلكترونية المخصصة لتقديم طلبات الإجازات المرضية والاستعلام عنها بكل سهولة وأمان.
                    </p>
                </div>

                <div className="footer-note-wrapper" style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                    <p style={{ color: '#94a3b8' }}>حقوق النشر © {year} - جميع الحقوق محفوظة</p>
                    <ul className="list-inline">
                        <li className="list-inline-item mx-3"><Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>الرئيسية</Link></li>
                        <li className="list-inline-item mx-3"><Link to="/submit" style={{ color: '#94a3b8', textDecoration: 'none' }}>تقديم طلب</Link></li>
                        <li className="list-inline-item mx-3"><Link to="/inquiry" style={{ color: '#94a3b8', textDecoration: 'none' }}>الاستعلام</Link></li>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Footer;
