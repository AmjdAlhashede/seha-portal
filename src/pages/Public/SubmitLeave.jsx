import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api/base';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Steps, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcaseMedical, faCheckCircle, faArrowLeft, faArrowRight, faIdCard, faBriefcase, faBuilding, faCalendarAlt, faStethoscope, faNotesMedical, faHospital, faClock } from '@fortawesome/free-solid-svg-icons';

const MySwal = withReactContent(Swal);

const SubmitLeave = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        patientNameAr: '',
        patientNameEn: '',
        idNumber: '',
        job: '',
        employer: '',
        nationality: 'سعودي',
        customNationality: '',
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

    const nextStep = () => {
        if (currentStep === 0) {
            if (!formData.patientNameAr || !formData.idNumber || !formData.job || !formData.employer) {
                message.warning('الرجاء إكمال كافة الحقول الأساسية قبل المتابعة.');
                return;
            }
        } else if (currentStep === 1) {
            if (!formData.startDate || !formData.daysCount || !formData.hospitalName || !formData.doctorName) {
                message.warning('الرجاء استكمال تفاصيل الإجازة الطبية.');
                return;
            }
        }
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const dataToSubmit = { ...formData };
            if (dataToSubmit.nationality === 'أخرى') {
                dataToSubmit.nationality = dataToSubmit.customNationality;
            }
            delete dataToSubmit.customNationality;

            const response = await fetch(`${API_BASE_URL.replace('/verify', '/api/add-leave')}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit)
            });

            const data = await response.json();

            if (response.ok) {
                MySwal.fire({
                    title: 'تم إصدار الإجازة بنجاح',
                    html: `
                        <div class="text-center p-3">
                            <i class="fas fa-check-circle text-success fade-in" style="font-size: 5rem; margin-bottom: 1.5rem;"></i>
                            <h4 style="color: var(--primary); font-weight: bold; margin-bottom: 0.5rem;">رقم الخدمة المرجعي</h4>
                            <div class="bg-light p-4 rounded-4 mt-3 mb-3 shadow-sm" style="border: 2px dashed var(--primary);">
                                <span style="font-size: 2rem; letter-spacing: 3px; font-weight: 900; color: #2c3e50;">${data.serviceCode}</span>
                            </div>
                            <p class="text-muted fw-bold">يرجى الاحتفاظ بهذا الرقم لاستخدامه في الاستعلام عن حالة الإجازة لاحقاً.</p>
                        </div>
                    `,
                    showConfirmButton: true,
                    confirmButtonText: 'إغلاق والعودة للرئيسية',
                    confirmButtonColor: 'var(--primary)',
                    customClass: {
                        popup: 'rounded-4 shadow-lg border-0'
                    }
                }).then(() => {
                    navigate('/');
                });
            } else {
                MySwal.fire('تنبيه', data.message || 'لم ينجح إرسال الطلب، يرجى المحاولة مرة أخرى.', 'warning');
            }
        } catch (error) {
            console.error('Submission error:', error);
            MySwal.fire('خطأ في الاتصال', 'تعذر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const stepItems = [
        {
            title: 'المعلومات الشخصية',
            icon: <FontAwesomeIcon icon={faUser} />
        },
        {
            title: 'التفاصيل الطبية',
            icon: <FontAwesomeIcon icon={faStethoscope} />
        },
        {
            title: 'الاعتماد النهائي',
            icon: <FontAwesomeIcon icon={faCheckCircle} />
        }
    ];

    return (
        <div className="inner-page container py-5" style={{ minHeight: '85vh', direction: 'rtl' }}>
            <div className="row justify-content-center">
                <div className="col-xl-9 col-lg-10">

                    <div className="text-center mb-5 fade-in">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 fw-bold border border-primary border-opacity-25">الخدمات الإلكترونية الموحدة</span>
                        <h1 className="fw-bold mb-3" style={{ color: 'var(--primary)', fontSize: '2.8rem' }}>إصدار إجازة مرضية</h1>
                        <p className="text-muted fs-5">قم بتعبئة بيانات المريض والإجازة ليتم تسجيلها واعتمادها في النظام الموحد بسهولة وموثوقية.</p>
                    </div>

                    <div className="premium-card p-4 p-md-5 shadow-lg border-0 rounded-4 glass-effect position-relative overflow-hidden fade-in">

                        <div className="position-absolute top-0 start-0 bg-primary opacity-5 rounded-circle" style={{ width: '400px', height: '400px', transform: 'translate(-30%, -30%)', filter: 'blur(60px)' }}></div>

                        <div className="position-relative z-index-1">
                            <Steps
                                current={currentStep}
                                items={stepItems}
                                className="custom-steps mb-5"
                                responsive={false}
                            />

                            <div className="form-content-area py-2">
                                <AnimatePresence mode="wait">
                                    {currentStep === 0 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">الاسم الكامل (عربي) <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faUser} /></span>
                                                        <input type="text" name="patientNameAr" className="form-control form-control-lg border-start-0 bg-light" placeholder="كما هو مدون في الهوية الوطنية" value={formData.patientNameAr} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">الاسم الكامل (English) <span className="text-muted fw-normal">(اختياري)</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faUser} /></span>
                                                        <input type="text" name="patientNameEn" className="form-control form-control-lg border-start-0 bg-light" placeholder="As written in Passport" value={formData.patientNameEn} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">رقم الهوية / الإقامة <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faIdCard} /></span>
                                                        <input type="text" name="idNumber" className="form-control form-control-lg border-start-0 bg-light" maxLength="10" placeholder="10 أرقام (مثال: 10xxxxxxx)" value={formData.idNumber} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">المسمى الوظيفي <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faBriefcase} /></span>
                                                        <input type="text" name="job" className="form-control form-control-lg border-start-0 bg-light" placeholder="طالب، مهندس، معلم..." value={formData.job} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">جهة العمل أو الدراسة <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faBuilding} /></span>
                                                        <input type="text" name="employer" className="form-control form-control-lg border-start-0 bg-light" placeholder="المدرسة، الجامعة، أو الشركة التي ينتمي إليها المريض" value={formData.employer} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">الجنسية <span className="text-danger">*</span></label>
                                                    <div className="input-group mb-2">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faIdCard} /></span>
                                                        <select name="nationality" className="form-select form-control-lg border-start-0 bg-light" value={formData.nationality} onChange={handleChange}>
                                                            <option value="سعودي">سعودي</option>
                                                            <option value="مصري">مصري</option>
                                                            <option value="سوري">سوري</option>
                                                            <option value="يمني">يمني</option>
                                                            <option value="أردني">أردني</option>
                                                            <option value="أخرى">أخرى</option>
                                                        </select>
                                                    </div>
                                                    {formData.nationality === 'أخرى' && (
                                                        <div className="input-group mt-2">
                                                            <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faUser} /></span>
                                                            <input type="text" name="customNationality" className="form-control form-control-lg border-start-0 bg-light" placeholder="أدخل الجنسية..." value={formData.customNationality} onChange={handleChange} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">تاريخ بداية الإجازة <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                                                        <input type="date" name="startDate" className="form-control form-control-lg border-start-0 bg-light text-start" dir="ltr" value={formData.startDate} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">مدة الإجازة (بالأيام) <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faClock} /></span>
                                                        <input type="number" name="daysCount" className="form-control form-control-lg border-start-0 bg-light" min="1" placeholder="مثال: 3" value={formData.daysCount} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">اسم المنشأة الصحية <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faHospital} /></span>
                                                        <input type="text" name="hospitalName" className="form-control form-control-lg border-start-0 bg-light" placeholder="المستشفى أو المركز الطبي المشرف" value={formData.hospitalName} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">اسم الطبيب المعالج <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faStethoscope} /></span>
                                                        <input type="text" name="doctorName" className="form-control form-control-lg border-start-0 bg-light" placeholder="د. محمد عبدالأمير..." value={formData.doctorName} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold text-dark d-block mb-2">التشخيص الطبي <span className="text-muted fw-normal">(اختياري)</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0 text-primary"><FontAwesomeIcon icon={faNotesMedical} /></span>
                                                        <input type="text" name="diagnosis" className="form-control form-control-lg border-start-0 bg-light" placeholder="وصف موجز لحالة المريض" value={formData.diagnosis} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="review-box bg-white p-4 p-md-5 rounded-4 border shadow-sm">
                                                <h5 className="fw-bold mb-4 pb-3 border-bottom d-flex align-items-center gap-3" style={{ color: 'var(--primary)' }}>
                                                    <FontAwesomeIcon icon={faCheckCircle} className="fs-4" />
                                                    مراجعة البيانات قبل الإصدار النهائي
                                                </h5>

                                                <div className="row g-4 mt-2">
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3">
                                                            <div className="bg-light p-3 rounded-circle text-primary">
                                                                <FontAwesomeIcon icon={faUser} className="fs-5" />
                                                            </div>
                                                            <div>
                                                                <span className="text-muted d-block small mb-1">اسم المريض</span>
                                                                <span className="fw-bold fs-5">{formData.patientNameAr || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3">
                                                            <div className="bg-light p-3 rounded-circle text-primary">
                                                                <FontAwesomeIcon icon={faIdCard} className="fs-5" />
                                                            </div>
                                                            <div>
                                                                <span className="text-muted d-block small mb-1">رقم الهوية</span>
                                                                <span className="fw-bold fs-5">{formData.idNumber || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3">
                                                            <div className="bg-light p-3 rounded-circle text-primary">
                                                                <FontAwesomeIcon icon={faBuilding} className="fs-5" />
                                                            </div>
                                                            <div>
                                                                <span className="text-muted d-block small mb-1">جهة العمل / الوظيفة</span>
                                                                <span className="fw-bold fs-6">{formData.employer || '-'} / {formData.job || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3">
                                                            <div className="bg-light p-3 rounded-circle text-primary">
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="fs-5" />
                                                            </div>
                                                            <div>
                                                                <span className="text-muted d-block small mb-1">فترة الإجازة</span>
                                                                <span className="fw-bold fs-6">بدءاً من <span dir="ltr">{formData.startDate}</span> لمدة ({formData.daysCount}) يوم</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3">
                                                            <div className="bg-light p-3 rounded-circle text-primary">
                                                                <FontAwesomeIcon icon={faHospital} className="fs-5" />
                                                            </div>
                                                            <div>
                                                                <span className="text-muted d-block small mb-1">المنشأة الصحية</span>
                                                                <span className="fw-bold fs-6">{formData.hospitalName || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-start gap-3">
                                                            <div className="bg-light p-3 rounded-circle text-primary">
                                                                <FontAwesomeIcon icon={faStethoscope} className="fs-5" />
                                                            </div>
                                                            <div>
                                                                <span className="text-muted d-block small mb-1">الطبيب المعالج</span>
                                                                <span className="fw-bold fs-6">{formData.doctorName || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="alert alert-primary bg-primary bg-opacity-10 mt-5 mb-0 border-0 rounded-3 d-flex gap-3 align-items-center shadow-sm">
                                                    <FontAwesomeIcon icon={faCheckCircle} className="fs-3 text-primary" />
                                                    <p className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>أقر بأن جميع البيانات المدخلة صحيحة وتطابق السجل الطبي للمريض، وأتحمل المسؤولية كاملة في حال ثبوت عكس ذلك.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="actions d-flex justify-content-between mt-5 pt-4 border-top">
                                <div>
                                    {currentStep > 0 && (
                                        <button className="btn btn-light border px-4 py-3 rounded-pill fw-bold text-dark shadow-sm hover-up" onClick={prevStep}>
                                            <FontAwesomeIcon icon={faArrowRight} className="me-2 text-muted" /> الخطوة السابقة
                                        </button>
                                    )}
                                </div>
                                <div>
                                    {currentStep < 2 && (
                                        <button className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow hover-up" onClick={nextStep}>
                                            المتابعة للخطوة القادمة <FontAwesomeIcon icon={faArrowLeft} className="ms-3" />
                                        </button>
                                    )}
                                    {currentStep === 2 && (
                                        <button className="btn btn-success px-5 py-3 rounded-pill fw-bold shadow-lg hover-up" onClick={handleSubmit} disabled={loading} style={{ fontSize: '1.1rem' }}>
                                            {loading ? <i className="fas fa-spinner fa-spin me-3"></i> : <i className="fas fa-check-circle me-3"></i>}
                                            {loading ? 'جاري الاعتماد والإصدار...' : 'اعتماد وإصدار الإجازة الآن'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitLeave;
