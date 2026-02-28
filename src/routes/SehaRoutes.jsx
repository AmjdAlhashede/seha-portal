import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from '../components/layout/AppLayout';
import Homepage from '../pages/Homepage/Homepage';
import SubmitLeave from '../pages/Public/SubmitLeave';
import Slenquiry from '../pages/Public/Slenquiry';
import NotFoundPage from '../pages/NotFoundPage';
const SehaRoutes = () => {
    return (
        <HashRouter>
            <ConfigProvider direction="rtl">
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Homepage />} />
                        <Route path="submit" element={<SubmitLeave />} />
                        <Route path="inquiry" element={<Slenquiry />} />
                        <Route path="inquiries/slenquiry" element={<Slenquiry />} />
                        <Route path="/*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </ConfigProvider>
        </HashRouter>
    );
};

export default SehaRoutes;
