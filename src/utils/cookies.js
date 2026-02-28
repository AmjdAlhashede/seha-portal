export const getCookie = (name) => {
    return localStorage.getItem(name);
};

export const setCookie = (name, value, days) => {
    localStorage.setItem(name, value);
};
