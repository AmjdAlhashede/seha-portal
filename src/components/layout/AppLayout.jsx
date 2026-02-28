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
            <div className="App min-vh-100 d-flex flex-column">
                <div className="app-mesh-bg"></div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>صحة - بوابة الإجازات المرضية الموحدة</title>
                </Helmet>
                <header className="sticky-top">
                    <Header />
                </header>
                <main className="flex-grow-1 fade-in">
                    <div className="content-area container-fluid h-100">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </ConfigProvider>
    );
};

export default AppLayout;
