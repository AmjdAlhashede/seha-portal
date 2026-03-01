import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage container-fluid px-0 h-100 overflow-hidden" style={{ direction: 'rtl', position: 'relative' }}>

            {/* Background Decorative Blur */}
            <div className="position-absolute bg-primary opacity-10 rounded-circle" style={{ width: '600px', height: '600px', top: '-20%', right: '-10%', filter: 'blur(80px)', zIndex: 0 }}></div>
            <div className="position-absolute bg-info opacity-10 rounded-circle" style={{ width: '400px', height: '400px', bottom: '10%', left: '-5%', filter: 'blur(60px)', zIndex: 0 }}></div>

            {/* Hero Section */}
            <section className="hero-section d-flex align-items-center justify-content-center text-center py-5 mb-4 position-relative z-index-1" style={{ minHeight: '40vh' }}>
                <div className="container py-4 mt-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-4 fw-bold border border-primary border-opacity-25" style={{ fontSize: '0.9rem' }}>
                            <i className="fas fa-star me-2 mb-1 text-warning"></i> الجيل الجديد للخدمات الصحية
                        </span>
                        <h1 className="display-3 fw-bold mb-4" style={{ color: 'var(--secondary)', letterSpacing: '-1.5px', lineHeight: '1.2' }}>
                            منصة الإجازات المرضية <span className="text-primary position-relative d-inline-block">الموحدة
                                <svg className="position-absolute start-0 w-100" style={{ bottom: '-10px', height: '12px' }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00021 6.84039C55.0594 1.83856 122.384 -1.33413 197.808 6.84039" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                        </h1>
                        <p className="lead mx-auto mb-5" style={{ color: 'var(--text-muted)', maxWidth: '750px', fontSize: '1.35rem', lineHeight: '1.8' }}>
                            نثق في صحتك. نوفر لك أسهل الوسائل لتقديم واستعلام الإجازات المرضية المعتمدة بكل شفافية وموثوقية في مكان واحد بتجربة رقمية استثنائية.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Service Selection Cards */}
            <div className="container pb-5 position-relative z-index-1">
                <div className="row g-4 justify-content-center">
                    <motion.div className="col-12 col-md-10 col-lg-5 col-xl-5"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="premium-card p-4 p-lg-5 text-center h-100 d-flex flex-column" onClick={() => navigate('/submit')} style={{ cursor: 'pointer', borderTop: '4px solid var(--primary)' }}>
                            <div className="icon-wrapper mx-auto mb-4 d-flex align-items-center justify-content-center shadow-sm transition-all" style={{ width: '90px', height: '90px', background: 'var(--primary-light)', borderRadius: '24px', color: 'var(--primary)', transform: 'rotate(-5deg)' }}>
                                <i className="fas fa-file-medical fa-3x" style={{ transform: 'rotate(5deg)' }}></i>
                            </div>
                            <h2 className="mb-3 fw-bold">تقديم طلب إجازة</h2>
                            <p className="text-muted mb-5 px-lg-3 flex-grow-1" style={{ fontSize: '1.1rem' }}>
                                هل ترغب في تقديم طلب إجازة مرضية جديدة؟ قم بتعبئة بياناتك الطبية لكي يتم معالجتها من قبل الجهات المختصة بكل سهولة وسرعة.
                            </p>
                            <Button className="btn-primary w-100 py-3 shadow-lg fs-5 rounded-pill mt-auto">
                                <i className="fas fa-plus-circle me-2"></i> إصدار طلب جديد
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div className="col-12 col-md-10 col-lg-5 col-xl-5"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="premium-card p-4 p-lg-5 text-center h-100 d-flex flex-column bg-white" onClick={() => navigate('/inquiry')} style={{ cursor: 'pointer', borderTop: '4px solid var(--secondary)' }}>
                            <div className="icon-wrapper mx-auto mb-4 d-flex align-items-center justify-content-center shadow-sm transition-all" style={{ width: '90px', height: '90px', background: '#f1f5f9', borderRadius: '24px', color: 'var(--secondary)', transform: 'rotate(5deg)' }}>
                                <i className="fas fa-qrcode fa-3x" style={{ transform: 'rotate(-5deg)' }}></i>
                            </div>
                            <h2 className="mb-3 fw-bold">تتبع صحة إجازة</h2>
                            <p className="text-muted mb-5 px-lg-3 flex-grow-1" style={{ fontSize: '1.1rem' }}>
                                لديك طلب مسبق أو تود التحقق من وثيقة؟ استعلم الآن عن حالة إجازتك المعتمدة وتحقق من موثوقيتها عبر رمز الخدمة بأمان تام.
                            </p>
                            <Button className="btn-outline-dark w-100 py-3 rounded-pill fw-bold border-2 fs-5 mt-auto transition-all" style={{ backgroundColor: '#fff', color: 'var(--secondary)' }}>
                                <i className="fas fa-search me-2"></i> استعلام مباشر
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Trust Badges */}
            <motion.div className="container py-5 text-center position-relative z-index-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <div className="d-flex flex-wrap justify-content-center gap-4 gap-md-5 opacity-75">
                    <div className="d-flex align-items-center gap-3 bg-white px-4 py-2 rounded-pill shadow-sm border">
                        <i className="fas fa-shield-alt text-primary fs-5"></i>
                        <span className="fw-bold text-secondary">حماية عالية للبيانات</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 bg-white px-4 py-2 rounded-pill shadow-sm border">
                        <i className="fas fa-bolt text-warning fs-5"></i>
                        <span className="fw-bold text-secondary">معالجة فورية ولحظية</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 bg-white px-4 py-2 rounded-pill shadow-sm border">
                        <i className="fas fa-check-double text-success fs-5"></i>
                        <span className="fw-bold text-secondary">اعتماد إلكتروني موثق</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Homepage;
