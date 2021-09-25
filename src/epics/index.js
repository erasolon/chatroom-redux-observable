import { combineEpics } from 'redux-observable';
import { sendPostsEpic } from './postFormEpic';
import { fetchPostsEpic } from "./postListEpic";
import {catchError} from "rxjs";


const rootEpic = (action$, store$, dependencies) => combineEpics(
    sendPostsEpic,
    fetchPostsEpic,

)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
        console.error(error);
        return source;
    })
);

export default  rootEpic