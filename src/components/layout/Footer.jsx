import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="py-5 mt-auto" style={{ borderTop: '1px solid #e2e8f0', background: 'white' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0 text-center text-md-start">
                        <h4 className="mb-2" style={{ color: 'var(--primary)', letterSpacing: '-0.5px' }}>صحة الموحدة</h4>
                        <p className="text-muted small mb-0">المنصة الشاملة لإدارة طلبات الإجازات المرضية بمنظومة إلكترونية متكاملة.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-4">
                            <Link to="/" className="text-muted text-decoration-none small fw-bold hover-primary">الرئيسية</Link>
                            <Link to="/submit" className="text-muted text-decoration-none small fw-bold hover-primary">قديم طلب</Link>
                            <Link to="/inquiry" className="text-muted text-decoration-none small fw-bold hover-primary">الاستعلام</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 pt-4 border-top">
                    <div className="col-12 text-center">
                        <p className="text-muted small mb-0">© {year} - جميع الحقوق محفوظة لمنصة صحة.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
