import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../api/base';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { validateID, formatDate } from '../../utils/inquiryUtils';
import "./Inquiry.css";

const Slenquiry = () => {
    const [serviceCode, setServiceCode] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inquiryError, setInquiryError] = useState(false);
    const [result, setResult] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const apiKey = "W1AzgjaX8AWooxS2qSDQuJFsXjFYf5vu";

    const handleInquire = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setResult(null);
        setInquiryError(false);

        if (serviceCode === "" || serviceCode.trim() === "") {
            setErrors(["فضلا اكتب الرمز "]);
        } else if (validateID(idNumber) < 0) {
            setErrors(["رقم الهوية خاطئ "]);
        } else {
            setLoading(true);
            const headers = new Headers();
            headers.append("apikey", apiKey);
            headers.append("content-type", "application/json");

            fetch(`${API_BASE_URL}/sick-leave-details?PatientId=${idNumber}&NormalizedServiceCode=${serviceCode}`, {
                method: "GET",
                headers: headers,
                redirect: "follow"
            }).then(res => res.json()).then(res => {
                if (res.data && res.data.length > 0 && res.data[0].SickLeaveDate !== "") {
                    let slDate = new Date(res.data[0].SickLeaveDate);
                    res.data[0].SickLeaveDate = slDate.toISOString().split("T")[0];
                }
                setResult(res);
                setShowForm(false);
                setLoading(false);
            }).catch(err => {
                setShowForm(false);
                setLoading(false);
                setInquiryError(true);
            });
        }
    };

    const handleNewInquiry = () => {
        setErrors([]);
        setInquiryError(false);
        setServiceCode("");
        setIdNumber("");
        setResult(null);
        setShowForm(true);
    };

    useEffect(() => {
        setErrors([]);
    }, [serviceCode, idNumber]);

    const getRelationshipLabel = (code) => {
        const relations = {
            1: "أم", 2: "أب", 3: "أخ", 4: "أخت", 5: "ابن", 6: "ابنة",
            7: "زوج", 8: "زوجة", 9: "جد", 10: "جدة", 11: "الخال",
            12: "العم", 13: "الخالة", 14: "العمة", 15: "ابن الأخت",
            16: "ابن الأخ", 17: "ابنة الأخت", 18: "ابنة الأخ"
        };
        return relations[code] || "";
    };

    return (
        <div className="inner-page container py-5 fade-in d-flex flex-column justify-content-center" style={{ minHeight: '80vh', direction: 'rtl' }}>
            <div className="row justify-content-center align-items-center w-100 mx-0">
                <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 px-0 px-md-3">
                    <div className="text-center mb-5">
                        <h1 className="display-5 mb-3">الاستعلام عن إجازة مرضية</h1>
                        <p className="text-muted lead">أدخل رمز الخدمة ورقم الهوية للتحقق من صحة وصلاحية الإجازة المرضية المصدرة.</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="premium-card p-4 p-md-5 mb-5 shadow-lg border-0 bg-white"
                        style={{ position: 'relative', overflow: 'hidden' }}
                    >
                        <div className="search-form position-relative z-index-1">
                            {errors.map((msg, idx) => (
                                <p key={idx} className="alert alert-danger mb-4 py-2 small">{msg}</p>
                            ))}

                            <div className="mb-4">
                                <label className="form-label">رمز الخدمة</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '0 12px 12px 0' }}>
                                        <i className="fas fa-hashtag text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        onChange={(e) => setServiceCode(e.target.value)}
                                        maxLength="20"
                                        value={serviceCode}
                                        placeholder="مثلاً: GSL-123456"
                                        className="form-control form-control-lg border-start-0"
                                        style={{ borderRadius: '12px 0 0 12px' }}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">رقم الهوية / الإقامة</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '0 12px 12px 0' }}>
                                        <i className="fas fa-id-card text-muted"></i>
                                    </span>
                                    <input
                                        onChange={(e) => setIdNumber(e.target.value)}
                                        value={idNumber}
                                        type="text"
                                        maxLength="10"
                                        placeholder="أدخل 10 أرقام"
                                        className="form-control form-control-lg border-start-0"
                                        style={{ borderRadius: '12px 0 0 12px' }}
                                    />
                                </div>
                            </div>

                            {inquiryError && (
                                <div className="alert alert-danger mt-2 py-2 small d-flex align-items-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    تعذر العثور على بيانات، تأكد من صحة الرمز ورقم الهوية.
                                </div>
                            )}

                            {showForm ? (
                                <button
                                    onClick={handleInquire}
                                    disabled={loading}
                                    className="btn-primary w-100 py-3 mt-2 d-flex align-items-center justify-content-center gap-3"
                                    type="submit"
                                >
                                    {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-search"></i>}
                                    استعلام عن الطلب
                                </button>
                            ) : (
                                <button onClick={handleNewInquiry} className="btn-primary w-100 py-3 mt-2">
                                    استعلام جديد
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {!showForm && result && result.data && result.data.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="verified-card shadow-lg mb-5 border border-primary border-opacity-10 bg-white rounded-4 overflow-hidden"
                            style={{ position: 'relative' }}
                        >
                            <div className="position-absolute bg-success opacity-5 rounded-circle" style={{ width: '200px', height: '200px', bottom: '-5%', left: '-5%', filter: 'blur(40px)', zIndex: 0 }}></div>
                            <div className="verified-badge position-relative z-index-1">
                                <i className="fas fa-check-circle"></i>
                                طلب معتمد
                            </div>
                            <div className="p-4 p-md-5 pt-5 mt-3">
                                <div className="text-center mb-5 pb-4 border-bottom">
                                    <h3 className="mb-1 text-primary">تفاصيل الإجازة المرضية</h3>
                                    <p className="text-muted small">هذا المستند موثق عبر منصة صحة الموحدة</p>
                                </div>

                                <div className="row g-4">
                                    <div className="col-md-6 result-item">
                                        <div className="result-label">اسم المريض</div>
                                        <div className="result-value text-uppercase">{result.data[0].PatientName}</div>
                                    </div>
                                    <div className="col-md-6 result-item">
                                        <div className="result-label">تاريخ الإصدار</div>
                                        <div className="result-value">{result.data[0].SickLeaveDate}</div>
                                    </div>
                                    <div className="col-md-6 result-item">
                                        <div className="result-label">تاريخ البدء</div>
                                        <div className="result-value">{formatDate(result.data[0].From)}</div>
                                    </div>
                                    <div className="col-md-6 result-item">
                                        <div className="result-label">تاريخ الانتهاء</div>
                                        <div className="result-value">{formatDate(result.data[0].To)}</div>
                                    </div>
                                    <div className="col-md-6 result-item">
                                        <div className="result-label">مدة الإجازة</div>
                                        <div className="result-value">{result.data[0].Duration} يوم</div>
                                    </div>
                                    <div className="col-md-6 result-item">
                                        <div className="result-label">الطبيب المعالج</div>
                                        <div className="result-value">{result.data[0]["Doctor NAME"] || "د. مجهول"}</div>
                                    </div>
                                    <div className="col-12 result-item">
                                        <div className="result-label">المنشأة الصحية</div>
                                        <div className="result-value">{result.data[0].HospitalName || "مركز صحي معتمد"}</div>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 text-center">
                                    <button className="btn btn-outline-primary px-5 py-2 fw-bold" onClick={() => window.print()}>
                                        <i className="fas fa-print me-2"></i>
                                        طباعة التقارير
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="text-center">
                        <Link className="btn btn-link text-muted text-decoration-none small" to="/">
                            <i className="fas fa-long-arrow-alt-right me-2"></i>
                            العودة للرئيسية
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slenquiry;
