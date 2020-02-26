export const SET_USER = 'SET_USER';
export const SET_ACTIVE_BOOK = 'SET_ACTIVE_BOOK';
export const ADD_CONTACT = 'ADD_CONTACT';

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

export const addContact = (newContact) => {
    return {
        type: ADD_CONTACT,
        newContact: newContact
    }
}