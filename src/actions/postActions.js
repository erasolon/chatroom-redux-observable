import {ActionTypes} from "../types";

export const sendPosts = state => ({
    type: ActionTypes.POST_CREATE,
    payload: state
})

export const unSendPosts = state => ({
    type: ActionTypes.POST_CREATE_CANCEL,
    payload: state
})

export const poolPostsStart = (date) => ({
    type: ActionTypes.POLL_POSTS_START,
    payload: {
        date: date,
    }
})

export const poolPostsStop = () => ({
    type: ActionTypes.POLL_POSTS_STOP,
    payload: {}
})
