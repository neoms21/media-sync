import {FILES_LOADED} from './constants';


export const initialState = {
    fileNames: [],
    files: []
};

const filesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILES_LOADED:

            return {
                ...state,
                files: action.files
            };

        default:
            return state;
    }
};

export default filesReducer;
