import Rx, {Observable, Subject} from 'rxjs';
import {POST_FILES, UPLOAD_COMPLETE} from "../logic/constants";
import {arrangementComplete, fileProgressEvent, fileSavedSuccessfully} from "../logic/actions";

export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .mergeMap((action) => {

            const data = new FormData();
            data.append('file', action.payload.file);
            const progressSubscriber = new Subject();

            const request = Rx.Observable.ajax({
                method: 'POST',
                url: `http://localhost:3000/pictures/save`,
                body: data,
                processData: false,
                contentType: false,
                progressSubscriber
            });

            const requestObservable = request
                .map(() => fileSavedSuccessfully(action.payload.file.name))
                .catch((err) => Observable.of({type: 'error', err}));

            return progressSubscriber
                .map((e) => {
                    return {percentage: (e.loaded / e.total) * 100, name: action.payload.file.name}
                })
                .map((x) => (fileProgressEvent({percentage: x.percentage, name: x.name})))
                .merge(requestObservable);
        });


export const filesUploadedEpic = action$ =>
    action$.ofType(UPLOAD_COMPLETE)
        .mergeMap((action) => {
            console.log(action);
            const data = new FormData();
            data.append('files', action.payload.files);
            data.append('folder', action.payload.folder);
            const request = Rx.Observable.ajax.post(`http://localhost:3000/files/arrange`, action.payload, {'Content-Type': 'application/json'});

            return request
                .map(() => arrangementComplete('Files moved'))
                .catch((err) => Observable.of({type: 'error', err}));


        });