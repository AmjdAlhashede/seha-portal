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
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname
        });
    }, [location]);

    useEffect(() => {
        Modal.destroyAll();
    }, [navigate]);

    const isLanding = location.pathname === "/" || location.pathname === "/investors";

    return (
        <ConfigProvider getPopupContainer={(trigger) => trigger.parentElement}>
            <div className="App">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{t("seo.title")}</title>
                    <meta name="description" content={t("seo.description")} />
                </Helmet>
                <main>
                    <div className={isLanding ? "landing-section" : ""}>
                        <div className="app-header">
                            <motion.div
                                style={{ zIndex: 99 }}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <Header />
                            </motion.div>
                        </div>
                        <Outlet />
                        <Footer />
                    </div>
                </main>
            </div>
        </ConfigProvider>
    );
};

export default AppLayout;
