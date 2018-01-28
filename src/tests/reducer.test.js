import FilesReducer from '../logic/files-reducer';
import {FILE_SAVE_SUCCESS, FILE_UPLOAD_PROGRESS} from "../logic/constants";

describe('Files reducer', () => {

    let initialState = {fileNames: [], files: [], error: '', folder: ''};

    beforeEach(() => {
        initialState = {fileNames: [], files: [], error: '', folder: ''};
    })

    it('should return initial state', () => {
        expect(FilesReducer(undefined, {})).toEqual(initialState);
    });

    it('should insert the record at same place in files array after progress update', () => {

        initialState.files.push(
            {name: '1'},
            {name: '2'},
            {name: '3'},
            {name: '4'},
            {name: '5'}
        );

        let resultantState = FilesReducer(initialState,
            {type: FILE_UPLOAD_PROGRESS, payload: {name: '3', percentage: '20'}});
        expect(resultantState.files.length).toBe(5);
        expect(resultantState.files[0].name).toBe('1');
        expect(resultantState.files[2].name).toBe('3');
        expect(resultantState.files[2].percentCompleted).toBe('20');

    });

    it('should update the upload complete and keep the file at its index', () => {

        initialState.files.push(
            {name: '1'},
            {name: '2'},
            {name: '3'},
            {name: '4'},
            {name: '5'}
        );

        let resultantState = FilesReducer(initialState,
            {type: FILE_SAVE_SUCCESS, payload: '3'});
        expect(resultantState.files.length).toBe(5);
        expect(resultantState.files[2].name).toBe('3');
        expect(resultantState.files[2].uploadComplete).toBe(true);

    });

});