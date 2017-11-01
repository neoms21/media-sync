import Rx, {Observable, Subject} from 'rxjs';

import {POST_FILES} from "../logic/constants";
import {fileProgressEvent, fileSavedSuccessfully} from "../logic/actions";

function progressSubject(fileName) {
    const progressSubscriber = new Subject();
    progressSubscriber
        .map((e) => {
            return {percentage: (e.loaded / e.total) * 100, name: fileName}
        })
        .map((x) => fileProgressEvent({percentage: x.percentage, name: x.name}));
    return progressSubscriber;
}

const topStories = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
const url = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
//
// export const postFilesEpic = action$ =>
//     action$.ofType(POST_FILES)
//         .switchMap(({payload}) => {
//             return Observable.of([15593589, 15595596, 15594542, 15591441, 15594004, 15592800, 15595123, 15593305])
//             // slice first 5 ids
//                 .map(ids => ids.slice(0, 5))
//                 // convert ids -> urls
//                 .map(ids => {
//                     console.log(ids);
//                     return ids.map(url)
//                 })
//                 // convert urls -> ajax
//                 .map(urls => urls.map(url => Observable.ajax.getJSON(url)))
//                 // execute 5 ajax requests
//                 .mergeMap(reqs => {
//                     console.log(reqs);
//                     return Observable.forkJoin(reqs)
//                 })
//                 // results -> store
//                 .map(stories => fileSavedSuccessfully(stories))
//         })


export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .switchMap(({payload}) => {
            return Observable.of(payload)
                .map(payloads => {
                    return payloads.map(p => {

                        const data = new FormData();
                        data.append('file', p.file);
                        return Rx.Observable.ajax({
                            method: 'POST',
                            url: `http://localhost:3000/users/save`,
                            body: data,
                            processData: false,
                            contentType: false,
                            progressSubscriber: progressSubject(p.file.name)
                        })

                    })

                })
                // .map(reqs => {
                //         return reqs.map(req => {
                //             req.request.console.log(req.request);
                //             return req.request;
                //         })
                //     }
                // )
                .mergeMap(reqs =>
                    Observable.forkJoin(reqs)
                )
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