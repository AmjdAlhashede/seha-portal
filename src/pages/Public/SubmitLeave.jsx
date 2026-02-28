import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api/base';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SubmitLeave = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        patientNameAr: '',
        patientNameEn: '',
        idNumber: '',
        birthDate: '',
        job: '',
        employer: '',
        city: 'الرياض',
        nationality: 'سعودي',
        startDate: new Date().toISOString().split('T')[0],
        daysCount: 1,
        diagnosis: '',
        doctorName: '',
        hospitalName: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL.replace('/verify', '/api/add-leave')}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                MySwal.fire({
                    title: 'تم تقديم الطلب بنجاح',
                    html: `<p style="font-size:1.1rem; color:#306DB5; font-weight:bold;">رمز الخدمة: ${data.serviceCode}</p><p>يرجى الاحتفاظ بهذا الرمز للاستعلام عن حالة طلبك لاحقاً.</p>`,
                    icon: 'success',
                    confirmButtonText: 'حسناً',
                    confirmButtonColor: '#306DB5'
                }).then(() => {
                    navigate('/');
                });
            } else {
                MySwal.fire('خطأ', data.message || 'فشل تقديم الطلب', 'error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            MySwal.fire('خطأ', 'حدث خطأ في الاتصال بالسيرفر', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inner-page container py-5 fade-in" style={{ direction: 'rtl' }}>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-8">
                    <div className="text-center mb-5">
                        <h1 className="display-5 mb-3">تقديم طلب إجازة مرضية</h1>
                        <p className="text-muted lead">يرجى إدخال كافة البيانات المطلوبة بدقة لضمان معالجة طلبك بشكل صحيح بنظامنا الموحد.</p>
                    </div>

                    <div className="premium-card p-4 p-lg-5 shadow-lg border-top border-5 border-primary">
                        <form onSubmit={handleSubmit}>
                            {/* Section: Personal Info */}
                            <div className="mb-5">
                                <h4 className="mb-4 d-flex align-items-center gap-3" style={{ color: 'var(--primary)' }}>
                                    <i className="fas fa-user-circle"></i>
                                    المعلومات الشخصية
                                </h4>
                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">الاسم الكامل (عربي)</label>
                                        <input type="text" name="patientNameAr" className="form-control form-control-lg" required onChange={handleChange} value={formData.patientNameAr} placeholder="أدخل كما هو في الهوية" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">الاسم الكامل (English)</label>
                                        <input type="text" name="patientNameEn" className="form-control form-control-lg" required onChange={handleChange} value={formData.patientNameEn} placeholder="Enter as per Passport/ID" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">رقم الهوية / الإقامة</label>
                                        <input type="text" name="idNumber" className="form-control form-control-lg" maxLength="10" required onChange={handleChange} value={formData.idNumber} placeholder="12XXXXXXXX" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">تاريخ الميلاد</label>
                                        <input type="date" name="birthDate" className="form-control form-control-lg" required onChange={handleChange} value={formData.birthDate} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">المسمى الوظيفي</label>
                                        <input type="text" name="job" className="form-control form-control-lg" required onChange={handleChange} value={formData.job} placeholder="مثلاً: مهندس، طالب..." />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">جهة العمل</label>
                                        <input type="text" name="employer" className="form-control form-control-lg" required onChange={handleChange} value={formData.employer} placeholder="اسم الشركة أو الجهة" />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Leave Details */}
                            <div className="mb-5">
                                <h4 className="mb-4 d-flex align-items-center gap-3" style={{ color: 'var(--primary)' }}>
                                    <i className="fas fa-calendar-check"></i>
                                    تفاصيل الإجازة
                                </h4>
                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">تاريخ بدء الإجازة</label>
                                        <input type="date" name="startDate" className="form-control form-control-lg" required onChange={handleChange} value={formData.startDate} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">مدة الإجازة (أيام)</label>
                                        <input type="number" name="daysCount" className="form-control form-control-lg" min="1" required onChange={handleChange} value={formData.daysCount} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">اسم المنشأة الصحية</label>
                                        <input type="text" name="hospitalName" className="form-control form-control-lg" required onChange={handleChange} value={formData.hospitalName} placeholder="المستشفى أو المركز الطبي" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">اسم الطبيب المعالج</label>
                                        <input type="text" name="doctorName" className="form-control form-control-lg" required onChange={handleChange} value={formData.doctorName} placeholder="اسم الدكتور المسؤول" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">التشخيص الطبي</label>
                                        <input type="text" name="diagnosis" className="form-control form-control-lg" onChange={handleChange} value={formData.diagnosis} placeholder="وصف موجز للحالة" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-top">
                                <button type="submit" disabled={loading} className="btn-primary w-100 py-3 mb-3" style={{ fontSize: '1.2rem' }}>
                                    {loading ? <i className="fas fa-circle-notch fa-spin me-2"></i> : null}
                                    {loading ? 'جاري إرسال الطلب...' : 'تأكيد وإصدار الطلب'}
                                </button>
                                <button type="button" onClick={() => navigate('/')} className="btn btn-link w-100 text-muted text-decoration-none small">إلغاء الطلب والعودة للرئيسية</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitLeave;
