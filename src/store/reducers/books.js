import { SET_BOOKS, ADD_BOOK } from '../actions/books';

const initialState = {
    books: [],
    activeBook: {}
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKS:
            return {
                books: action.books,
                activeBook: action.activeBook
            };
        case ADD_BOOK:
            return { ...state, books: [...state.books, action.newBook] };
        default:
            return state;
    }
}

export default booksReducer;