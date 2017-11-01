import Rx, {Observable, Subject} from 'rxjs';

import {POST_FILES} from "../logic/constants";
import {fileProgressEvent, fileSavedSuccessfully} from "../logic/actions";

function progressSubject(fileName) {
    const progressSubscriber = new Subject();
    const mapping = progressSubscriber
        .map((e) => {
            return {percentage: (e.loaded / e.total) * 100, name: fileName}
        })
        .map((x) => fileProgressEvent({percentage: x.percentage, name: x.name}));
    return {mapping, progressSubscriber};
}

export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .switchMap(({payload}) => {
            return Observable.of(payload)
                .map(payloads => {
                    return payloads.map(p => {

                        const data = new FormData();
                        data.append('file', p.file);
                        let uploadRequest = Rx.Observable.ajax({
                            method: 'POST',
                            url: `http://localhost:3000/users/save`,
                            body: data,
                            processData: false,
                            contentType: false
                        });
                        return {name: p.file.name, uploadRequest};

                    })

                })
                .mergeMap(reqs => {
                    reqs.forEach(r => {
                        const x = progressSubject(r.name);
                        r.uploadRequest.progressSubscriber = x.progressSubscriber;
                        r.uploadRequest.merge(x.mapping);
                    });
                    return Observable.forkJoin(reqs.map(r => r.uploadRequest))
                })
                .map(results =>
                    fileSavedSuccessfully('123')
                );
        });


//Single File

// let arr = [];
// payload.forEach(f => {
//
//     const requestObservable =;
//
//     arr.push(px.mapping.merge(requestObservable));
// });

// return Observable.merge(...arr).map(() => {
//     console.log('done');
//     return fileSavedSuccessfully('234')
// });
// return resultantSubject.map(x => console.log);//.merge(px.mapping).merge(requestObservable);
// })
// ;


// export const postFilesEpic = action$ =>
//     action$.ofType(POST_FILES)
//         .mergeMap((action) => {
//             // const data = new FormData();
//             // data.append('file', action.payload[0].file);
//             //
//             // let px = extracted(action.payload[0].file.name);
//             //
//             // const request = Rx.Observable.ajax({
//             //     method: 'POST',
//             //     url: `http://localhost:3000/users/save`,
//             //     body: data,
//             //     processData: false,
//             //     contentType: false,
//             //     progressSubscriber: px.progressSubscriber
//             // });
//             //
//             // const requestObservable = request
//             //     .map(() => fileSavedSuccessfully('done d'))
//             //     .catch((err) => Observable.of({type: 'error', err}));
//
//             // resultantSubject.mapTo(px.mapping)
//             //     .merge(requestObservable);
//             let arr = [];
//             action.payload.forEach(f => {
//                 const data = new FormData();
//                 data.append('file', f.file);
//
//                 let px = extracted(f.file.name);
//
//                 const request = Rx.Observable.ajax({
//                     method: 'POST',
//                     url: `http://localhost:3000/users/save`,
//                     body: data,
//                     processData: false,
//                     contentType: false,
//                     progressSubscriber: px.progressSubscriber
//                 });
//
//                 const requestObservable = request
//                     .map(() => fileSavedSuccessfully('done d'))
//                     .catch((err) => Observable.of({type: 'error', err}));
//
//                 arr.push(px.mapping.merge(requestObservable));
//             });
//
//             return Observable.forkJoin(arr).map(() => {
//                 console.log('done');
//                 return fileSavedSuccessfully('234')
//             });
//             // return resultantSubject.map(x => console.log);//.merge(px.mapping).merge(requestObservable);
//         });