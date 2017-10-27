import {Observable} from 'rxjs';
import axios from 'axios';
import {POST_FILES} from "../logic/constants";
import {fileSavedSuccessfully} from "../logic/actions";

export const postFilesEpic = action$ =>
    action$.ofType(POST_FILES)
        .mergeMap(action => {

                const data = new FormData();
                data.append('file', action.payload[0]);
                return axios.post('http://localhost:3000/users/save', data).then((messages) => {
                    console.log(messages);
                    return {type: fileSavedSuccessfully, payload: messages};
                })

            }
        );