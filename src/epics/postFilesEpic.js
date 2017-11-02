import Rx, {Observable, Subject} from 'rxjs';
import {POST_FILES} from "../logic/constants";
import {fileProgressEvent, fileSavedSuccessfully} from "../logic/actions";

export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .mergeMap((action) => {

            const data = new FormData();
            data.append('file', action.payload.file);
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
                    return {percentage: (e.loaded / e.total) * 100, name: action.payload.file.name}
                })
                .map((x) => (fileProgressEvent({percentage: x.percentage, name: x.name})))
                .merge(requestObservable);
        });