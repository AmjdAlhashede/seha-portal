import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="error-page not-found">
                <div className="seha-logo">
                    <img width={395} src="/assets/img/logos/logo.svg" alt="seha-logo" />
                </div>
                <h1>عذراً</h1>
                <h4>الصفحة التي تحاول الوصول إليها غير موجودة</h4>
                <div className="call-to-action-primary">
                    <Button onClick={() => navigate("/")}>
                        الصفحة الرئيسية <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
