import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage container mt-5 mb-5" style={{ direction: 'rtl' }}>
            <div className="text-center mb-5 hero-section">
                <h1 style={{ color: '#306DB5', fontWeight: '800', fontSize: '2.5rem' }}>منصة الإجازات المرضية</h1>
                <p style={{ color: '#64748b', fontSize: '1.2rem' }}>مرحباً بك في المنصة الموحدة لإدارة واستعلام الإجازات المرضية.</p>
            </div>

            <div className="row g-4 justify-content-center">
                <div className="col-md-5">
                    <Card className="h-100 border-0 shadow-sm transition-hover" style={{ borderRadius: '25px', overflow: 'hidden' }}>
                        <div style={{ background: 'linear-gradient(135deg, #306DB5 0%, #7eb7db 100%)', height: '10px' }}></div>
                        <Card.Body className="p-5 text-center d-flex flex-column align-items-center">
                            <div style={{ width: '80px', height: '80px', background: '#f0f7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: '#306DB5' }}>
                                <i className="fas fa-file-medical fa-3x"></i>
                            </div>
                            <Card.Title style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px' }}>تقديم طلب جديد</Card.Title>
                            <Card.Text style={{ color: '#64748b', fontSize: '1rem', marginBottom: '30px', flexGrow: 1 }}>
                                بدأت تشعر بالتعب؟ يمكنك الآن تقديم طلب إجازة مرضية إلكترونياً بكل سهولة من خلال تعبئة النموذج المخصص.
                            </Card.Text>
                            <Button
                                onClick={() => navigate('/submit')}
                                className="w-100 p-3 fw-bold"
                                style={{ borderRadius: '15px', backgroundColor: '#306DB5', border: 'none' }}
                            >
                                ابدأ التقديم
                            </Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-5">
                    <Card className="h-100 border-0 shadow-sm transition-hover" style={{ borderRadius: '25px', overflow: 'hidden' }}>
                        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', height: '10px' }}></div>
                        <Card.Body className="p-5 text-center d-flex flex-column align-items-center">
                            <div style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: '#0f172a' }}>
                                <i className="fas fa-search fa-3x"></i>
                            </div>
                            <Card.Title style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px' }}>استعلام عن حالة طلب</Card.Title>
                            <Card.Text style={{ color: '#64748b', fontSize: '1rem', marginBottom: '30px', flexGrow: 1 }}>
                                هل قمت بتقديم طلب بالفعل؟ يمكنك متابعة حالة طلبك ومعرفة ما إذا تمت الموافقة عليه أم لا باستخدام رمز الخدمة.
                            </Card.Text>
                            <Button
                                onClick={() => navigate('/inquiry')}
                                className="w-100 p-3 fw-bold"
                                style={{ borderRadius: '15px', backgroundColor: '#0f172a', border: 'none' }}
                            >
                                تتبع الطلب
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
