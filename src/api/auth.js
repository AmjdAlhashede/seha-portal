import { CallHeadersGet, API_BASE_URL, API_ACCOUNT_URL, CallGETHeaders } from './base';

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
