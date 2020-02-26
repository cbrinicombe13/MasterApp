import { SET_USER, SET_ACTIVE_BOOK, ADD_CONTACT } from '../actions/user';

const initialState = {
    user: {
        username: '',
        email: '',
        labels: [],
        books: [],
        activeBook: '',
        activeContacts: []
    }
};

const userReducer = (state = initialState, action) => {

    const getActiveIndex = (books, activeBook) => {
        return books.findIndex(book => {
            return Object.keys(book)[0] === activeBook;
        });
    }

    switch (action.type) {
        case SET_USER:
            const details = action.details;
            const activeBook = Object.keys(details.books[0])[0];
            let activeIndex = getActiveIndex(details.books, activeBook);
            return {
                user: {
                    username: details.username,
                    email: details.email,
                    labels: details.labels,
                    books: details.books,
                    activeBook: activeBook,
                    activeContacts: Object.values(details.books[activeIndex])[0]
                }
            };
        case SET_ACTIVE_BOOK:
                let newActiveIndex = getActiveIndex(state.user.books, action.activeBook);
            return {
                user: {
                    ...state.user,
                    activeBook: action.activeBook,
                    activeContacts: Object.values(state.user.books[newActiveIndex])[0]
                }
            };
        case ADD_CONTACT:
            const activeBookIndex = getActiveIndex(state.user.books, state.user.activeBook);
            const newActiveContacts = {
                [state.user.activeBook]: [
                    ...Object.values(state.user.activeContacts),
                    action.newContact
                ]
            };
            state.user.books.splice(activeBookIndex, 1, newActiveContacts);
            const newState = {
                user: {
                    ...state.user,
                    activeContacts: Object.values(state.user.books[activeBookIndex])[0]
                }
            };
            return newState;
        default:
            return state;
    }
}

export default userReducer;