import {
    APP_ERROR,
    ARNG_COMPLETE,
    FILE_SAVE_SUCCESS,
    FILE_UPLOAD_PROGRESS,
    FILES_LOADED,
    FOLDER_NAME_CHANGED,
    POST_FILES,
    UPLOAD_COMPLETE,
} from './constants';

export const filesSelected = (files, length) => {
    return {type: FILES_LOADED, payload: {files, length}};
};

export const folderNameChanged = content => {
    return {type: FOLDER_NAME_CHANGED, payload: content};
};

export const postFile = content => {
    return {type: POST_FILES, payload: content};
};

export const fileSavedSuccessfully = content => {
    return {type: FILE_SAVE_SUCCESS, payload: content};
};

export const fileProgressEvent = content => {
    return {type: FILE_UPLOAD_PROGRESS, payload: content};
};

export const uploadComplete = content => {
    console.log(content);
    return {type: UPLOAD_COMPLETE, payload: content};
};

export const arrangementComplete = content => {
    console.log(content);
    return {type: ARNG_COMPLETE, payload: content};
};

export const errorOccurred = content => {

    return {type: APP_ERROR, payload: content};
};
