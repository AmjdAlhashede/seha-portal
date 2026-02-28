import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from './store';
import SehaRoutes from './routes/SehaRoutes';
import './index.css';
import '../assets/css/index-_RsT5dOe-readable.css';
import './i18n/i18n';

// Initialize Swiper and other global configs
// import Swiper from 'swiper';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Swiper.use([Navigation, Pagination, Autoplay]);

ConfigProvider.config({
    theme: {
        primaryColor: "#306DB5"
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <SehaRoutes />
    </Provider>
);
