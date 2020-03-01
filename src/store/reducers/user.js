import {
    SET_USER,
    SET_ACTIVE_BOOK,
    ADD_CONTACT,
    ADD_BOOK,
    DELETE_BOOK,
    LOGOUT
} from '../actions/user';

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
            let activeBookIndex = getActiveIndex(state.user.books, state.user.activeBook);
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

        case ADD_BOOK:
            return {
                user: {
                    ...state.user,
                    labels: [...state.user.labels, action.details.newLabel],
                    books: [...state.user.books, {
                        [action.details.newLabel]: [action.details.newContact]
                    }]
                }
            };

        case DELETE_BOOK:
            let toDelete = getActiveIndex(state.user.books, state.user.activeBook);
            // If on end..
            if(toDelete === state.user.books.length - 1) {
                // ..if also only book..
                if(state.user.books.length === 1) {
                    // ..empty books, activeBook, activeContacts:
                    return {
                        user: {
                            ...state.user,
                            books: [],
                            activeContacts: [],
                            activeBook: ''
                        }
                    }
                // ..if not only book but is the last, remove and activate predeccessor:
                } else {
                    state.user.books.splice(toDelete, 1);
                    state.user.labels.splice(toDelete, 1);
                    return {
                        user: {
                            ...state.user,
                            activeBook: Object.keys(state.user.books[toDelete - 1])[0],
                            activeContacts: Object.values(state.user.books[toDelete - 1])[0]
                        }
                    }
                }
            // ..if not last book active successor:
            } else {
                state.user.books.splice(toDelete, 1);
                state.user.labels.splice(toDelete, 1);
                return {
                    user: {
                        ...state.user,
                        activeBook: Object.keys(state.user.books[toDelete])[0],
                        activeContacts: Object.values(state.user.books[toDelete])[0]
                    }
                }
            }

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
}

export default userReducer;