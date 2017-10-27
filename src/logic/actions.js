import {
    ADD_ITEM, COMPLETE_ITEM, DELETE_ITEM, FILE_SAVE_SUCCESS, FILES_LOADED, POST_FILES,
    TOGGLE_VISIBILITY
} from './constants';

export const filesSelected = content => {
    return {type: FILES_LOADED, files: content};
};

export const postFiles = content => {
    return {type: POST_FILES, payload: content};
};

export const fileSavedSuccessfully = content => {
    return {type: FILE_SAVE_SUCCESS, payload: content};
};
