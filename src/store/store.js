import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';
import themesReducer from './reducers/theme';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themesReducer
});

const store = createStore(rootReducer);

export default store;