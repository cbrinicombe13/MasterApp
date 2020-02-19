export const SET_USER = 'SET_USER';

export const setUser = (details) => {
    return {
        type: SET_USER,
        details: details
    };
}