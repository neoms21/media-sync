import Rx, {Observable, Subject} from 'rxjs';
import {POST_FILES, UPLOAD_COMPLETE} from "../logic/constants";
import {arrangementComplete, errorOccurred, fileProgressEvent, fileSavedSuccessfully} from "../logic/actions";

const server = '192.168.0.20';
export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .mergeMap((action) => {

            const data = new FormData();
            data.append('file', action.payload.file);
            const progressSubscriber = new Subject();

            const request = Rx.Observable.ajax({
                method: 'POST',
                url: `http://${server}:3000/pictures/save`,
                body: data,
                processData: false,
                contentType: false,
                progressSubscriber
            });

            const requestObservable = request
                .map(() => fileSavedSuccessfully(action.payload.file.name))
                .catch((err) => Observable.of(errorOccurred(err.message)));

            return progressSubscriber
                .map((e) => {
                    return {percentage: Math.round((e.loaded / e.total) * 100), name: action.payload.file.name}
                })
                .map((x) => (fileProgressEvent({percentage: x.percentage, name: x.name})))
                .catch((err) => {
                    return Observable.of(errorOccurred(err.message))
                })
                .merge(requestObservable);
        });


export const filesUploadedEpic = action$ =>
    action$.ofType(UPLOAD_COMPLETE)
        .mergeMap((action) => {
            const request = Rx.Observable.ajax.post(`http://${server}:3000/files/arrange`,
                action.payload, {'Content-Type': 'application/json'});

            return request
                .map(() => arrangementComplete('Files moved'))
                .catch((err) => Observable.of({type: 'error', err}));


        });