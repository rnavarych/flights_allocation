import { filesUpload } from '../constants/actionTypes';

const initialState = {
    flights: [],
    fetching: false,
    error: null,
};

export default function centres(state = initialState, action) {
    switch(action.type){
        case filesUpload.SEND_FILE_REQUEST:
            return {
                ...state,
                fetching: true,
            };

        case filesUpload.SEND_FILE_SUCCESS:
            return {
                ...state,
                flights: Object.values(action.result),
                fetching: false,
            };

        case filesUpload.SEND_FILE_FAILURE:
            return {
                ...state,
                error: action.error,
                fetching: false,
            };

        default:
            return state;
    }
}
