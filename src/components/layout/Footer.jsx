import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="py-5 mt-auto glass-effect"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.6)', background: 'rgba(255, 255, 255, 0.8)' }}
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0 text-center text-md-start">
                        <h4 className="mb-2 fw-bold" style={{ color: 'var(--primary)', letterSpacing: '-0.5px' }}>
                            <i className="fas fa-heartbeat me-2 text-primary opacity-75"></i> منصة صحة الموحدة
                        </h4>
                        <p className="text-muted small mb-0 fw-medium">المنصة الشاملة لإدارة طلبات الإجازات المرضية بمنظومة إلكترونية متكاملة.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-4">
                            <Link to="/" className="text-muted text-decoration-none small fw-bold hover-primary transition-all">الرئيسية</Link>
                            <Link to="/submit" className="text-muted text-decoration-none small fw-bold hover-primary transition-all">تقديم طلب</Link>
                            <Link to="/inquiry" className="text-muted text-decoration-none small fw-bold hover-primary transition-all">الاستعلام</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 pt-4 border-top border-opacity-25" style={{ borderColor: 'var(--text-muted)' }}>
                    <div className="col-12 text-center">
                        <p className="text-muted small mb-0 opacity-75 fw-medium">© {year} - جميع الحقوق محفوظة لمنصة صحة.</p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
