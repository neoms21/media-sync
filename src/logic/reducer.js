import {FILE_SAVE_SUCCESS, FILE_UPLOAD_PROGRESS, FILES_LOADED, FOLDER_NAME_CHANGED} from './constants';


export const initialState = {
    fileNames: [],
    files: [],
    folder: ''
};

const filesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILES_LOADED:

            return {
                ...state,
                files: action.files.map(f => {
                    return {name: f.name, file: f, size: f.size, percentCompleted: 0, uploadComplete: false}
                })
            };

        case FILE_UPLOAD_PROGRESS:
            let progressFile = state.files.find(f => f.name === action.payload.name);
            progressFile.percentCompleted = action.payload.percentage;
            return {...state, files: [...state.files.filter(f => f.name !== action.payload.name), progressFile]};

        case FILE_SAVE_SUCCESS:
            let savedFile = state.files.find(f => f.name === action.payload);
            savedFile.uploadComplete = true;
            return {...state, files: [...state.files.filter(f => f.name !== action.payload), savedFile]};

        case FOLDER_NAME_CHANGED:
            return {...state, folder: action.payload};

        default:
            return state;
    }
};

export default filesReducer;
