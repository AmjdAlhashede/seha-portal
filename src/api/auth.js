import { CallHeadersGet, API_BASE_URL, API_ACCOUNT_URL, CallGETHeaders } from './base';
import { setCookie, getCookie } from '../utils/cookies';

export const getSectorType = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lookups/account-sector`, CallHeadersGet());
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching sector type:", error);
        return null;
    }
};

export const GetJWTUserToken = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${API_ACCOUNT_URL}/Account/GetJWTUserToken`, CallGETHeaders());
            if (!response.ok) {
                setCookie("JWTUserToken", "", -1);
                setCookie("AuthToken", "", -1);
                localStorage.clear();
                return resolve(null);
            }
            const data = await response.json();
            if (data.ErrorCode === 100 && getCookie("JWTUserToken") !== "") {
                localStorage.clear();
                return reject(null);
            }
            if (data.ErrorCode === 0) {
                localStorage.setItem("JWTUserToken", data.Data.Token);
                return resolve(data.Data.Token);
            }
            resolve(null);
        } catch (error) {
            reject(null);
        }
    });
};
