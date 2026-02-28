import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage container-fluid px-0 h-100 overflow-hidden" style={{ direction: 'rtl' }}>
            {/* Hero Section */}
            <section className="hero-section text-center py-5 mb-5 px-3" style={{ background: 'linear-gradient(180deg, rgba(48, 109, 181, 0.05) 0%, transparent 100%)' }}>
                <div className="container py-lg-4">
                    <h1 className="display-4 mb-3" style={{ color: 'var(--secondary)', letterSpacing: '-1px' }}>منصة الإجازات المرضية الموحدة</h1>
                    <p className="lead mx-auto" style={{ color: 'var(--text-muted)', maxWidth: '700px', fontSize: '1.25rem' }}>
                        نثق في صحتك. نوفر لك أسهل الوسائل لتقديم واستعلام الإجازات المرضية المعتمدة بكل شفافية وموثوقية في مكان واحد.
                    </p>
                </div>
            </section>

            {/* Service Selection Cards */}
            <div className="container pb-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-5">
                        <div className="premium-card p-4 p-lg-5 text-center h-100 pointer-event" onClick={() => navigate('/submit')} style={{ cursor: 'pointer' }}>
                            <div className="icon-wrapper mb-4 d-inline-flex align-items-center justify-content-center" style={{ width: '90px', height: '90px', background: 'var(--primary-light)', borderRadius: '30px', color: 'var(--primary)', transform: 'rotate(-5deg)' }}>
                                <i className="fas fa-plus-circle fa-3x" style={{ transform: 'rotate(5deg)' }}></i>
                            </div>
                            <h2 className="mb-3">تقديم طلب إجازة</h2>
                            <p className="text-muted mb-4 px-lg-4">
                                هل ترغب في تقديم طلب إجازة مرضية جديدة؟ قم بتعبئة بياناتك الطبية لكي يتم معالجتها من قبل الجهات المختصة.
                            </p>
                            <Button className="btn-primary w-100 py-3 shadow-lg">إصدار طلب جديد</Button>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="premium-card p-4 p-lg-5 text-center h-100" onClick={() => navigate('/inquiry')} style={{ cursor: 'pointer' }}>
                            <div className="icon-wrapper mb-4 d-inline-flex align-items-center justify-content-center" style={{ width: '90px', height: '90px', background: '#f8fafc', borderRadius: '30px', color: 'var(--secondary)', border: '1px solid #e2e8f0' }}>
                                <i className="fas fa-search-plus fa-3x"></i>
                            </div>
                            <h2 className="mb-3">تتبع حالة إجازة</h2>
                            <p className="text-muted mb-4 px-lg-4">
                                لديك طلب مسبق؟ يمكنك الآن الاستعلام عن حالة طلبك والتحقق من صحة الإجازة المصدرة باستخدام رمز الخدمة.
                            </p>
                            <Button className="btn-outline-dark w-100 py-3 rounded-pill fw-bold border-2" style={{ borderRadius: 'var(--radius-sm)' }}>استعلام الأن</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges or Stats Block (Optional for WOW factor) */}
            <div className="container py-5 text-center opacity-50">
                <div className="d-flex flex-wrap justify-content-center gap-5">
                    <div className="d-flex align-items-center gap-2">
                        <i className="fas fa-shield-alt text-primary"></i>
                        <span className="small fw-bold">بيانات مشفرة وآمنة</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <i className="fas fa-bolt text-primary"></i>
                        <span className="small fw-bold">معالجة فورية للطلبات</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <i className="fas fa-check-circle text-primary"></i>
                        <span className="small fw-bold">اعتماد رسمي معترف به</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
