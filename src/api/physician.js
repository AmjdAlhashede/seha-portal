import { CallHeaders, CallHeadersPOST, API_BASE_URL } from './base';

export const physicians = async (params = [], ordering = []) => {
    let result;
    const intFields = ["pageNumber", "PageNumber", "pageSize", "accountId", "organizationId", "status", "organizationTypeId"];
    const queryParams = {};

    if (params.length > 0) {
        params.forEach(param => {
            const [key, value] = param.split("=");
            queryParams[key] = intFields.includes(key) ? parseInt(value) : value;
        });
    }
    queryParams.ordering = ordering;

    try {
        const response = await fetch(`${API_BASE_URL}/physicians`, CallHeadersPOST(queryParams));
        const data = await response.json();
        if (data.statusCode === 200) {
            result = data.data;
        }
    } catch (error) {
        console.error("Error fetching physicians:", error);
        return false;
    }
    return result;
};

// Lookups
export const medicalAccounts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lookups/medical-accounts`, CallHeaders(""));
        const data = await response.json();
        return data.data.result;
    } catch (error) {
        return false;
    }
};

export const contractType = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lookups/contract-type`, CallHeaders(""));
        const data = await response.json();
        return data.data;
    } catch (error) {
        return false;
    }
};

export const insuranceCompany = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lookups/insurance-company`, CallHeaders(""));
        const data = await response.json();
        return data.data;
    } catch (error) {
        return false;
    }
};

export const medicalFacilityTypes = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lookups/medical-facility-types`, CallHeaders(""));
        const data = await response.json();
        return data.data.result;
    } catch (error) {
        return false;
    }
};

export const physicianStatus = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lookups/physician-status`, CallHeaders(""));
        const data = await response.json();
        return data.data;
    } catch (error) {
        return false;
    }
};

// Details & Fetching
export const getDetailsPhysician = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/details/${id}`, CallHeaders(""));
        const data = await response.json();
        return data.data;
    } catch (error) {
        return false;
    }
};

export const physicianOrganizationsDetails = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/organizations-details/${id}`, CallHeaders(""));
        const data = await response.json();
        return data.data;
    } catch (error) {
        return false;
    }
};

// Registration
export const PhysicianRegister = async (idNumber, licenceNumber) => {
    const body = { idNumber, licenceNumber };
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/register`, CallHeadersPOST(body));
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const PhysicianComplateRegister = async (payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/complete-register`, CallHeadersPOST(payload));
        return await response.json();
    } catch (error) {
        return false;
    }
};

// Actions & Updates
export const deletePhysician = async (id, organizationId) => {
    const body = { id, organizationId };
    try {
        const response = await fetch(`${API_BASE_URL}/physicians`, CallHeadersPOST(body, "", "", "DELETE"));
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const resendVerificationLink = async (idNumber, organizationId) => {
    const body = { idNumber, organizationId };
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/resend-verification-link`, CallHeadersPOST(body));
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const PhysicianUpdatePopUp = async (body) => {
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/update-physician-work`, CallHeadersPOST(body));
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const updateEmailPhy = async (id, organizationId, email) => {
    const body = { physicianID: id, organizationId, email };
    try {
        const response = await fetch(`${API_BASE_URL}/physicians`, CallHeadersPOST(body, "", "", "PATCH"));
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const updateStatusOrgs = async (id, organizationId, status, email) => {
    const body = { physicianID: id, organizationId, status, email };
    try {
        const response = await fetch(`${API_BASE_URL}/physicians`, CallHeadersPOST(body, "", "", "PATCH"));
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const updateStatusPhy = async (id, status) => {
    const body = { physicianID: parseInt(id), status };
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/info`, CallHeadersPOST(body, "", "", "PUT"));
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const physicianCertificatePdf = async (organizationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/physicians/certificate-pdf`, CallHeadersPOST({ OrganizationId: organizationId }));
        if (response.status !== 200) return false;
        return await response.blob();
    } catch (error) {
        return false;
    }
};
