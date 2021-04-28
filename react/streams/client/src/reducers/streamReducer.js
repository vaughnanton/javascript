import _ from 'lodash';
import { 
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
        // list of streams from api and return new object with key as idea and stream object as value
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        // when we get action with fetch stream
        case FETCH_STREAM:
            // take state object, make new object with values, and dynamically add key/value pair
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // in actions we dispatch with the id so we don't reference .id, use lodash to create new object without what we passed in with the action.payload
            return _.omit(state, action.payload);
        default:
            return state;
    }
};