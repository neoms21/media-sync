import {FILE_SAVE_SUCCESS, FILE_UPLOAD_PROGRESS, FILES_LOADED} from './constants';


export const initialState = {
    fileNames: [],
    files: []
};

const filesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILES_LOADED:

            return {
                ...state,
                files: action.files.map(f => {
                        return {key: f.name, file: f, size: f.size}
                })
            };

        case FILE_UPLOAD_PROGRESS:
            let progressFile = state.files.find(f => f.key === action.payload.name);
            progressFile.percentCompleted = action.payload.percentage;
            return {...state, files: [...state.files.filter(f => f.key !== action.payload.name), progressFile]};

        case FILE_SAVE_SUCCESS:
            console.log(action);
            return state;

        default:
            return state;
    }
};

export default filesReducer;
