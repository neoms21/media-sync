import Rx, {Observable, Subject} from 'rxjs';

import {POST_FILES} from "../logic/constants";
import {fileProgressEvent, fileSavedSuccessfully} from "../logic/actions";

function extracted(fileName) {
    const progressSubscriber = new Subject();
    const mapping = progressSubscriber
        .map((e) => {
            console.log(e);
            return {percentage: (e.loaded / e.total) * 100, name: fileName}
        })
        .map((x) => fileProgressEvent({percentage: x.percentage, name: x.name}));
    return {mapping, progressSubscriber};
}


export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .mergeMap((action) => {

            const data = new FormData();
            data.append('file', action.payload[0].file);

            // const progressSubscriber = (fileName) => {
            //     const sub = new Subject();
            //     sub.map((e) => {
            //         console.log(e);
            //         return {percentage: (e.loaded / e.total) * 100, name: fileName}
            //     }).map((x) => fileProgressEvent({percentage: x.percentage, name: fileName}));
            //     return sub;
            // };

            let px = extracted(action.payload[0].file.name);
            //  const progSubscriber = progressSubscriber(action.payload[0].file.name);
            //console.log(progSubscriber);
            const request = Rx.Observable.ajax({
                method: 'POST',
                url: `http://localhost:3000/users/save`,
                body: data,
                processData: false,
                contentType: false,
                progressSubscriber: px.progressSubscriber
            });

            const requestObservable = request
                .map(() => fileSavedSuccessfully('done d'))
                .catch((err) => Observable.of({type: 'error', err}));

            return px.mapping
                .merge(requestObservable);
        });