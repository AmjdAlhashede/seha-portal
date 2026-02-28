import { getCookie } from './cookies';

export const parseJwt = (token) => {
    try {
        const base64Url = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(atob(base64Url).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

export const getCookie = (name) => {
    return localStorage.getItem(name);
};
