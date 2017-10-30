import {
    FILE_SAVE_SUCCESS, FILE_UPLOAD_PROGRESS, FILES_LOADED, POST_FILES,
} from './constants';

export const filesSelected = content => {
    return {type: FILES_LOADED, files: content};
};

export const  postFiles = content => {
    return {type: POST_FILES, payload: content};
};

export const fileSavedSuccessfully = content => {
    return {type: FILE_SAVE_SUCCESS, payload: content};
};

export const fileProgressEvent = content => {
    return {type: FILE_UPLOAD_PROGRESS, payload: content};
};
