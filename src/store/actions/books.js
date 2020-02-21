export const SET_BOOKS = 'SET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';

export const setBooks = (books, activeBook = {}) => {
    return {
        type: SET_BOOKS,
        books: books,
        activeBook: activeBook
    };
}

export const addBook = (book) => {
    return {
        type: ADD_BOOK,
        newBook: book
    }
}