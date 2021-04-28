import { combineReducers } from 'redux';
// change named import to formReducer to be more descriptive
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});