import {combineEpics} from 'redux-observable';
import {postFilesEpic} from "./postFilesEpic";


// combine all epics into one
export const rootEpic = combineEpics(
    postFilesEpic
);