import { ofType } from "redux-observable";
import { ActionTypes } from "../types";
import { mergeMap} from "rxjs";
import {nanoid} from "@reduxjs/toolkit";
import {Axios} from "axios-observable";
import {completedPost, errorPost, successPost} from "../actions/postActions";
import store from "../store";



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
            mergeMap(action => {
                Axios.post(URL,{
                    "id": nanoid,
                    "title": action.payload.message,
                    "content": action.payload.message
                },axiosConfig)
                    .subscribe({
                        next: (v) => store.dispatch(successPost(v.data)),
                        error: (e) => store.dispatch(errorPost(e)),
                        complete: () => store.dispatch(completedPost()),
                    })
                },
            ),

        )
}