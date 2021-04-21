import { combineReducers } from 'redux';
// change named import to formReducer to be more descriptive
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer
});