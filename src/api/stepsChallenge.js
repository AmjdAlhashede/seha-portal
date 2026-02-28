import { CallHeadersPOST, CallHeadersGet, API_BASE_URL } from './base';

const CHALLENGE_BASE_URL = `${API_BASE_URL}/steps-challenge`;

export const fetchChallenges = async (categoryId, sourceOrganizationId = null) => {
    try {
        let url = `${CHALLENGE_BASE_URL}/public/steps-challenges?pageNumber=1&pageSize=1000&categoryId=${categoryId}`;
        if (categoryId === 3 && sourceOrganizationId) {
            url += `&sourceOrganizationId=${parseInt(sourceOrganizationId)}`;
        }
        const response = await fetch(url, CallHeadersGet());
        const data = await response.json();
        return data.statusCode === 200 ? data.data : data;
    } catch (error) {
        console.error("Error fetching challenges:", error);
        return false;
    }
};

export const deleteChallenge = async (challengeId, sourceOrganizationId = null) => {
    try {
        let url = `${CHALLENGE_BASE_URL}/public/delete-challenge?challengeId=${challengeId}`;
        if (sourceOrganizationId) {
            url += `&sourceOrganizationId=${parseInt(sourceOrganizationId)}`;
        }
        const response = await fetch(url, CallHeadersPOST({}, "", "", "PATCH"));
        return await response.json();
    } catch (error) {
        console.error("Error deleting challenge:", error);
        return false;
    }
};

export const fetchOrganizationsLookup = async (keyword = "", pageNumber = 1) => {
    try {
        const url = `${API_BASE_URL}/lookups/organizations?PageNumber=${pageNumber}&PageSize=50&Keyword=${encodeURIComponent(keyword)}&TypeFlagId=256`;
        const response = await fetch(url, CallHeadersGet());
        return await response.json();
    } catch (error) {
        console.error("Error fetching organizations lookup:", error);
        return false;
    }
};

export const createPrivateChallenge = async (payload) => {
    return await fetch(`${API_BASE_URL}/steps-challenge/private/create-challenge`, CallHeadersPOST(payload));
};

export const updatePrivateChallenge = async (payload) => {
    return await fetch(`${API_BASE_URL}/steps-challenge/private/update-challenge`, CallHeadersPOST(payload));
};

export const downloadPrivateBanner = async (challengeId, type) => {
    return await fetch(`${API_BASE_URL}/steps-challenge/public/download-file?challengeId=${challengeId}&type=${type}`, CallHeadersGet());
};

export const joinChallenge = async (payload) => {
    try {
        const response = await fetch(`${CHALLENGE_BASE_URL}/public/join-challenge`, CallHeadersPOST(payload));
        return await response.json();
    } catch (error) {
        console.error("Error joining challenge:", error);
        return false;
    }
};

export const savePublicChallenge = async (payload, isUpdate = false) => {
    try {
        const method = isUpdate ? "PUT" : "POST";
        const url = isUpdate ? `${CHALLENGE_BASE_URL}/public/update-challenge` : `${CHALLENGE_BASE_URL}/public/save-challenge`;
        const response = await fetch(url, CallHeadersPOST(payload, "", "", method));
        return await response.json();
    } catch (error) {
        console.error("Error saving public challenge:", error);
        return false;
    }
};

export const savePrivateChallenge = async (payload, isUpdate = false) => {
    try {
        const method = isUpdate ? "PUT" : "POST";
        const url = isUpdate ? `${CHALLENGE_BASE_URL}/private/update-challenge` : `${CHALLENGE_BASE_URL}/private/save-challenge`;
        const response = await fetch(url, CallHeadersPOST(payload, "", "", method));
        return await response.json();
    } catch (error) {
        console.error("Error saving private challenge:", error);
        return false;
    }
};
export const downloadBanner = async (challengeId) => {
    try {
        const url = `${CHALLENGE_BASE_URL}/public/download-file?challengeId=${challengeId}&type=1`;
        return await fetch(url, CallHeadersGet());
    } catch (error) {
        console.error("Error downloading banner:", error);
        return false;
    }
};

export const fetchEmployeesForChallenge = async (keyword = "", organizationId = null) => {
    try {
        let url = `${CHALLENGE_BASE_URL}/public/employees-for-challenge?keyword=${encodeURIComponent(keyword)}`;
        if (organizationId) url += `&organizationId=${organizationId}`;
        return await fetch(url, CallHeadersGet());
    } catch (error) {
        console.error("Error fetching employees for challenge:", error);
        return false;
    }
};

export const createChallengeGroup = async (payload) => {
    try {
        return await fetch(`${CHALLENGE_BASE_URL}/public/create-group`, CallHeadersPOST(payload));
    } catch (error) {
        console.error("Error creating challenge group:", error);
        return false;
    }
};

export const updateChallengeGroup = async (payload) => {
    try {
        return await fetch(`${CHALLENGE_BASE_URL}/public/update-group`, CallHeadersPOST(payload, "", "", "PUT"));
    } catch (error) {
        console.error("Error updating challenge group:", error);
        return false;
    }
};
