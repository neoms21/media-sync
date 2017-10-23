import {ADD_ITEM, COMPLETE_ITEM, DELETE_ITEM, FILES_LOADED, TOGGLE_VISIBILITY} from './constants';

export const filesSelected = content => {
    return {type: FILES_LOADED, files: content};
};
