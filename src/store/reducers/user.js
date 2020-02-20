import { SET_USER } from '../actions/user';

const initialState = {
    user: {
        username: '',
        email: '',
        books: []
    }
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            const details = action.details;
            return {
                user: {
                    username: details.username,
                    email: details.email,
                    books: details.books 
                }
            };
        default:
            return state;
    }
}

export default userReducer;