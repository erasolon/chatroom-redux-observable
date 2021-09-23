import { combineEpics } from 'redux-observable';
import { sendPostsEpic } from './postEpic';
import {catchError} from "rxjs";


const rootEpic = (action$, store$, dependencies) => combineEpics(
    sendPostsEpic,

)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
        console.error(error);
        return source;
    })
);

export default  rootEpic