import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import SehaRoutes from './routes/SehaRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './i18n/i18n';

ConfigProvider.config({
    theme: {
        primaryColor: "#306DB5"
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SehaRoutes />
);
