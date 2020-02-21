import { createStore, combineReducers } from 'redux';

import userReducer from './reducers/user';
import themesReducer from './reducers/theme';
import booksReducer from './reducers/books';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themesReducer,
    books: booksReducer
});

const store = createStore(rootReducer);

export default store;