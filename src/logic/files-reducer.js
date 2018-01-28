import { APP_ERROR, FILE_SAVE_SUCCESS, FILE_UPLOAD_PROGRESS, FILES_LOADED, FOLDER_NAME_CHANGED } from './constants';


export const initialState = {
    fileNames: [],
    files: [],
    folder: '',
    error: ''
};

const filesReducer = (state = initialState, action) => {

    function findElementAndFilter(arr, prop, valToCompareAgainst) {
        let elementToFind = arr.find(a => a[prop] === valToCompareAgainst);
        const index = arr.indexOf(elementToFind);

        let filteredFiles = arr.filter(f => f[prop] !== valToCompareAgainst);
        return {file: elementToFind, index, filteredFiles};
    }

    switch (action.type) {
        case FILES_LOADED:

            const {files, length} = action.payload;
            let selectedFiles = files;
            let filesArr = [];

            for (let i = 0; i < length; i++) {
                filesArr.push(selectedFiles[i]);
            }
            console.log(filesArr);

            return {
                ...state,
                files: filesArr.map(f => {
                    return {name: f.name, file: f, percentCompleted: 0, uploadComplete: false}
                })
            };

        case FILE_UPLOAD_PROGRESS: {
            const result = findElementAndFilter(state.files, 'name', action.payload.name);
            result.file.percentCompleted = action.payload.percentage;
            result.filteredFiles.splice(result.index, 0, result.file);
            return {...state, files: result.filteredFiles};
        }

        case FILE_SAVE_SUCCESS: {
            const result = findElementAndFilter(state.files, 'name', action.payload);
            result.file.uploadComplete = true;
            result.filteredFiles.splice(result.index, 0, result.file);
            return {...state, files: result.filteredFiles};
        }

        case FOLDER_NAME_CHANGED:
            return {...state, folder: action.payload};
        case APP_ERROR:
            return {...state, error: action.payload};

        default:
            return state;
    }
};

export default filesReducer;
