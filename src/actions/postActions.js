import {ActionTypes} from "../types";

export const sendPosts = state => ({
    type: ActionTypes.POST_CREATE,
    payload: state
})

export const unSendPosts = state => ({
    type: ActionTypes.POST_CREATE_CANCEL,
    payload: state
})

export const fetchPosts = () => ({
    type: ActionTypes.FETCH_POSTS,
    payload: {}
})
