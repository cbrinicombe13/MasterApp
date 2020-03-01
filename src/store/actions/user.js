export const SET_USER = 'SET_USER';
export const SET_ACTIVE_BOOK = 'SET_ACTIVE_BOOK';
export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const LOGOUT = 'LOGOUT';

export const setUser = (details) => {
    return {
        type: SET_USER,
        details: details
    };
}

export const setActiveBook = (book) => {
    return {
        type: SET_ACTIVE_BOOK,
        activeBook: book
    };
}

export const addContact = (details) => {
    return {
        type: ADD_CONTACT,
        newContact: details
    }
}

export const addBook = (details) => {
    return {
        type: ADD_BOOK,
        details: details
    }
}

export const deleteBook = () => {
    return {
        type: DELETE_BOOK
    }
}

export const signOut = () => {
    return {
        type: LOGOUT
    }
}