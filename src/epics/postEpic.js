import { ofType } from "redux-observable";
import { ActionTypes } from "../types";
import {delay, mapTo } from "rxjs";

export function sendPostsEpic(action$) {
    return action$
        .pipe(
            ofType(ActionTypes.SEND_POST),
            delay(1000),
            mapTo({ type: 'PONG' })
        )
}