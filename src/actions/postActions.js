import {ActionTypes} from "../types";

export const sendPosts = state => ({
    type: ActionTypes.POST_CREATE,
    payload: state
})

export const unSendPosts = state => ({
    type: ActionTypes.POST_CREATE_CANCEL,
    payload: state
})

export const poolPostsStart = () => ({
    type: ActionTypes.POLL_POSTS_START,
    payload: {}
})

export const poolPostsStop = () => ({
    type: ActionTypes.POLL_POSTS_STOP,
    payload: {}
})
