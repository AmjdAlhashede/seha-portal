import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigProvider, Modal } from 'antd';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

// Mock GA for now to prevent reference errors
const ReactGA = {
    send: (data) => console.log("GA Send:", data)
};

const AppLayout = () => {
    const location = useLocation();

    return (
        <ConfigProvider getPopupContainer={(trigger) => trigger.parentElement}>
            <div className="App">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>صحة - بوابة الإجازات المرضية</title>
                </Helmet>
                <main>
                    <div className="app-header">
                        <Header />
                    </div>
                    <div className="content-area pt-4 pb-4">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </ConfigProvider>
    );
};

export default AppLayout;
