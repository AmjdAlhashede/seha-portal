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
        <div className="inner-page container mt-5 mb-5" style={{ maxWidth: '800px', direction: 'rtl' }}>
            <h1 className="heading text-center mb-4">تقديم طلب إجازة مرضية</h1>
            <p className="sub-heading text-center mb-5">يرجى إدخال كافة البيانات المطلوبة بدقة لضمان معالجة طلبك بشكل صحيح.</p>

            <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">الاسم (عربي)</label>
                            <input type="text" name="patientNameAr" className="form-control" required onChange={handleChange} value={formData.patientNameAr} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">الاسم (إنجليزي)</label>
                            <input type="text" name="patientNameEn" className="form-control" required onChange={handleChange} value={formData.patientNameEn} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">رقم الهوية / الإقامة</label>
                            <input type="text" name="idNumber" className="form-control" maxLength="10" required onChange={handleChange} value={formData.idNumber} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">تاريخ الميلاد</label>
                            <input type="date" name="birthDate" className="form-control" required onChange={handleChange} value={formData.birthDate} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">الوظيفة</label>
                            <input type="text" name="job" className="form-control" required onChange={handleChange} value={formData.job} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">جهة العمل</label>
                            <input type="text" name="employer" className="form-control" required onChange={handleChange} value={formData.employer} />
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">تاريخ بدء الإجازة</label>
                            <input type="date" name="startDate" className="form-control" required onChange={handleChange} value={formData.startDate} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">مدة الإجازة (بالأيام)</label>
                            <input type="number" name="daysCount" className="form-control" min="1" required onChange={handleChange} value={formData.daysCount} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">اسم المستشفى / المركز</label>
                            <input type="text" name="hospitalName" className="form-control" required onChange={handleChange} value={formData.hospitalName} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">اسم الطبيب</label>
                            <input type="text" name="doctorName" className="form-control" required onChange={handleChange} value={formData.doctorName} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">التشخيص</label>
                        <input type="text" name="diagnosis" className="form-control" onChange={handleChange} value={formData.diagnosis} />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">ملاحظات إضافية</label>
                        <textarea name="notes" className="form-control" rows="3" onChange={handleChange} value={formData.notes}></textarea>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary w-100 p-3 fw-bold" style={{ borderRadius: '12px', fontSize: '1.1rem' }}>
                        {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
                    </button>

                    <button type="button" onClick={() => navigate('/')} className="btn btn-link w-100 mt-3 text-muted">إلغاء والعودة للرئيسية</button>
                </form>
            </div>
        </div>
    );
};

export default SubmitLeave;
