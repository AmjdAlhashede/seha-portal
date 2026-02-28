import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const UnauthrizedComp = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="error-page not-found">
                <div className="seha-logo">
                    <img width={395} src="/assets/img/logos/logo.svg" alt="seha-logo" />
                </div>
                <div className="error-img">
                    <h2 style={{ fontSize: "72px", fontWeight: 700, color: "#262f5f", lineHeight: 2 }}>
                        403
                    </h2>
                </div>
                <h1>عذراً</h1>
                <h4>المصدر الذي تبحث عنه غير موجود أو ليس لديك الصلاحيات للوصول إليه</h4>
                <div className="call-to-action-primary">
                    <Button onClick={() => navigate("/")}>
                        الصفحة الرئيسية <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UnauthrizedComp;
