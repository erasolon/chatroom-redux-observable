import {ofType} from "redux-observable";
import {ActionTypes} from "../types";
import {
    mergeMap,
    race,
    take,
} from "rxjs";
import {Axios} from "axios-observable";
import store from "../store";
import {completedFetchingPost, errorFetchingPost, newPost} from "../reducers/postsListSlice";

export function fetchPostsEpic (action$) {
    const URL = "http://localhost:8080/api/postdate"
    const axiosConfig = (action) => {
        return {
            params: {
                'date': action.payload.date
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }
    };

    return action$
        .pipe(
            ofType(ActionTypes.POLL_POSTS_START),
            mergeMap(action => {
                    race(
                        Axios.get(URL, axiosConfig(action))
                            .subscribe({
                                next: (v) => v.data.forEach(s => store.dispatch(newPost(s))),
                                error: (e) => store.dispatch(errorFetchingPost(e)),
                                complete: () => store.dispatch(completedFetchingPost()),
                            }),
                        action$.pipe(
                            ofType(ActionTypes.POLL_POSTS_STOP),
                            take(1)
                        )
                    )
                },

            ),
        )
}