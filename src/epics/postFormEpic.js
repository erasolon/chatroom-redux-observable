import { ofType } from "redux-observable";
import { ActionTypes } from "../types";
import { mergeMap } from "rxjs";
import {Axios} from "axios-observable";
import store from "../store";
import { addPostCompleted, addPostError, addPostPending} from "../reducers/postFormSlice";

export function sendPostsEpic(action$) {
    const URL = "http://localhost:8080/api/posts"
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return action$
        .pipe(
            ofType(ActionTypes.POST_CREATE),
            mergeMap(action => Axios.post(URL,{
                    "topic": action.payload.topic,
                    "username": action.payload.username,
                    "message": action.payload.message
                },axiosConfig)
                    .subscribe({
                        next: (v) => store.dispatch(addPostPending()),
                        error: (e) => store.dispatch(addPostError(e)),
                        complete: () => store.dispatch(addPostCompleted()),
                    })
            ),
        )

}