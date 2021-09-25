import {ofType} from "redux-observable";
import {ActionTypes} from "../types";
import {mergeMap} from "rxjs";
import {Axios} from "axios-observable";
import store from "../store";
import {addPostCompleted, addPostError, addPostPending} from "../reducers/postFormSlice";
import {completedFetchingPost, errorFetchingPost, newPost} from "../reducers/postsListSlice";

export function fetchPostsEpic (action$) {
    const URL = "http://localhost:8080/api/posts"
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return action$
        .pipe(
            ofType(ActionTypes.FETCH_POSTS),
            mergeMap(action => Axios.get(URL,axiosConfig)
                    .subscribe({
                        next: (v) => store.dispatch(newPost(v)),
                        error: (e) => store.dispatch(errorFetchingPost(e)),
                        complete: () => store.dispatch(completedFetchingPost()),
                    })
            ),
        )

}