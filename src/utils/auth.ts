export const getAuthToken = (): string | null => {
    return sessionStorage.getItem("authToken") || null;
};

export const setAuthToken = (token: string | null) => {
    if (token) sessionStorage.setItem("authToken", token);
    else sessionStorage.removeItem("authToken");
};

export const clearAuth = () => {
    sessionStorage.removeItem("authToken");
};
