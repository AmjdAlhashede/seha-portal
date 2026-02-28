import { getCookie } from '../utils/cookies';

// export const API_BASE_URL = "/api/v2";
// export const API_ACCOUNT_URL = "/api";

// Centralized Backend URL (Point to the centralized admin API)
export const API_BASE_URL = "https://admin.seha.it.com/verify";
export const API_ACCOUNT_URL = "https://admin.seha.it.com/api";

export const getApiPrefix = () => API_BASE_URL;

export const CallHeadersGet = (token = getCookie("JWTUserToken")) => ({
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "accept-language": "ar",
        "Content-Type": "application/json"
    },
    credentials: "include",
    redirect: "follow"
});

export const CallGETHeaders = CallHeadersGet; // Alias
export const CallHeaders = CallHeadersGet;    // Alias for legacy support

export const CallHeadersPOST = (body, contentType = "application/json", token = getCookie("JWTUserToken"), method = "POST") => {
    const headers = new Headers();
    if (contentType) {
        headers.append("Content-Type", contentType);
    }
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
        headers.append("x-token", token); // Keep for compatibility
    }
    headers.append("accept-language", "ar");

    const config = {
        method: method,
        headers: headers,
        credentials: "include",
        redirect: "follow"
    };

    if (body) {
        config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    return config;
};

export const CallHeadersPOSTNoAuth = (body, contentType = "application/json", captchaToken = "", method = "POST", includeLang = true) => {
    const headers = new Headers();
    if (includeLang) {
        headers.append("accept-language", "ar");
    }
    if (contentType) {
        headers.append("Content-Type", contentType);
    }
    if (captchaToken) {
        headers.append("x-token", captchaToken);
    }

    return {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        credentials: "include",
        redirect: "follow"
    };
};

// Alias for compatibility with bundled code pattern
export const CallHeadersPOST$1 = CallHeadersPOST;

export const CallHeadersFormDataPOST = (body, token = getCookie("JWTUserToken"), method = "POST") => {
    const headers = new Headers();
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
        headers.append("x-token", token); // Keep for compatibility
    }
    headers.append("accept-language", "ar");

    return {
        method: method,
        headers: headers,
        body: body, // body should be a FormData object
        credentials: "include",
        redirect: "follow"
    };
};

export const CallHeadersGetNoAuth = (token = "", sessionId = "", captchaToken = "") => {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    if (captchaToken) {
        headers.append("x-token", captchaToken);
    }

    return {
        method: "GET",
        headers: headers,
        credentials: "include",
        redirect: "follow"
    };
};

export const CallHeadersPut = (body, token = getCookie("JWTUserToken")) => CallHeadersPOST(body, "application/json", token, "PUT");

export const CallHeadersDelete = (body, token = getCookie("JWTUserToken")) => CallHeadersPOST(body, "application/json", token, "DELETE");

export const CallHeadersDeleteFormData = (body, token = getCookie("JWTUserToken")) => CallHeadersFormDataPOST(body, token, "DELETE");

export const enumChallengeCategory = {
    challengeBetweenOrganizations: 5,
    challengeForEmployees: 3
};

export const enumChallengeType = {
    steps: 1
};

export const enumChallengeStatus = {
    draft: 1,
    scheduled: 2,
    published: 3,
    started: 4,
    completed: 5,
    deleted: 6
};

export const CHALLENGE_TYPES = {
    TARGET_GOAL: "هدف محدد",
    HIGHEST_STEPS: "أعلى عدد خطوات"
};
