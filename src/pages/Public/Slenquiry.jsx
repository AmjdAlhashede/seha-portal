import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../api/base';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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
        <div className="inner-page inquiries-container">
            <h1 className="heading">الإجازات المرضية</h1>
            <p className="sub-heading">خدمة الاستعلام عن الإجازات المرضية تتيح لك الاستعلام عن حالة طلبك للإجازة ويمكنك طباعتها عن طريق تطبيق صحتي</p>

            <div className="row justify-content-center mt-1">
                <div className="col-md-5 p-4">
                    {errors.map((msg, idx) => (
                        <p key={idx} className="alert alert-danger">{msg}</p>
                    ))}

                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setServiceCode(e.target.value)}
                            maxLength="20"
                            value={serviceCode}
                            placeholder="رمز الخدمة"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label></label>
                        <input
                            onChange={(e) => setIdNumber(e.target.value)}
                            value={idNumber}
                            type="text"
                            maxLength="10"
                            pattern="\\d*"
                            placeholder="رقم الهوية / الإقامة"
                            className="form-control"
                        />
                    </div>

                    {inquiryError && (
                        <div className="alert alert-danger mt-2">خطأ في الاستعلام</div>
                    )}

                    {result && (
                        result.data && result.data.length > 0 ? (
                            <div className="results-inquiery row mt-4">
                                <div className="col-md-6">
                                    <span>الاسم: </span> {result.data[0].PatientName}
                                </div>
                                {result.data[0]["Patient Name"] && (
                                    <div className="col-md-6">
                                        <span>اسم المرافق:</span> {result.data[0]["Patient Name"]}
                                    </div>
                                )}
                                {result.data[0].Relationship && (
                                    <div className="col-md-6">
                                        <span>صلة القرابة:</span>{" "}
                                        <span style={{ fontWeight: "300" }}>
                                            {getRelationshipLabel(result.data[0].Relationship)}
                                        </span>
                                    </div>
                                )}
                                <div className="col-md-6">
                                    <span>تاريخ إصدار تقرير الإجازة:</span> {result.data[0].SickLeaveDate}
                                </div>
                                <div className="col-md-6">
                                    <span>تبدأ من:</span> {formatDate(result.data[0].From)}
                                </div>
                                <div className="col-md-6">
                                    <span>وحتى:</span> {formatDate(result.data[0].To)}
                                </div>
                                <div className="col-md-6">
                                    <span>المدة بالأيام:</span> {result.data[0].Duration}
                                </div>
                                <div className="col-md-6">
                                    <span>اسم الطبيب:</span> {result.data[0]["Doctor NAME"]}
                                </div>
                                <div className="col-md-6">
                                    <span>المسمى الوظيفي:</span> {result.data[0].JobTitle}
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-danger mt-2">لا يوجد نتائج</div>
                        )
                    )}

                    {showForm ? (
                        <button
                            onClick={handleInquire}
                            disabled={loading}
                            className="btn btn-primary mt-3"
                            type="submit"
                        >
                            استعلام
                            {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin ms-2" />}
                        </button>
                    ) : (
                        <button onClick={handleNewInquiry} className="btn btn-primary mt-3">
                            استعلام جديد
                        </button>
                    )}
                </div>

                <div className="col-md-12 text-center">
                    <Link className="btn btn-primary mb-3" to="/inquiries">
                        رجوع للاستعلامات
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Slenquiry;
