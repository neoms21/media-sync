import Rx, {Observable, Subject} from 'rxjs';

import {POST_FILES} from "../logic/constants";
import {fileProgressEvent, fileSavedSuccessfully} from "../logic/actions";

let config = (name) => {
    return {
        onUploadProgress: progressEvent => {
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

            fileProgressEvent({name, percentCompleted});
            // do whatever you like with the percentage complete
            // maybe dispatch an action that will update a progress bar or something
        }
    }
};
export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .mergeMap((action) => {
            // const { url, valetKey, blobId, blobData, contentType } = payload;
            const data = new FormData();
            data.append('file', action.payload[0].file);
            const progressSubscriber = new Subject();

            const request = Rx.Observable.ajax({
                method: 'POST',
                url: `http://localhost:3000/users/save`,
                body: data,
                processData: false,
                contentType: false,
                progressSubscriber
            });

            const requestObservable = request
                .map(() => fileSavedSuccessfully('done d'))
                .catch((err) => Observable.of({type: 'error', err}));

            return progressSubscriber
                .map((e) => {
                    console.log(e);
                    return {percentage: (e.loaded / e.total) * 100, name: action.payload[0].file.name}
                })
                .map((x) => ({type: 'FILE_UPLOAD_PROGRESS', payload: {percentage: x.percentage, name: x.name}}))
                .merge(requestObservable);
        });
//     .mergeMap(action => {
//             const data = new FormData();
//             data.append('file', action.payload[0]);
//
//             let axiosPromise = axios.post('http://localhost:3000/users/save', data, config(action.payload[0].name));
//             // axiosPromise.then((messages) => {
//             //     console.log('uploaded');
//             //     return {type: 'FILE_SAVE_SUCCESS'};
//             // });
//
//             return Observable.fromPromise(axiosPromise);
//             // let promises = [];
//             // action.payload.forEach(f => {
//             //     const data = new FormData();
//             //     data.append('file', f);
//             //     let axiosPromise = axios.post('http://localhost:3000/users/save', data, config(f.name));
//             //     promises.push(axiosPromise);
//             //     // axiosPromise.then((messages) => {
//             //     //     Observable.of({type: fileSavedSuccessfully, payload: messages});
//             //     // })
//             //
//             //
//             // });
//             //
//             // return axios.all(promises).then((x) => {
//             //     console.log(x);
//             //     return ({type: fileSavedSuccessfully, payload: {}})
//             //
//             // })
//         }
//     ).map(ev => {
//     console.log(ev);
//     return fileSavedSuccessfully('123')
// });