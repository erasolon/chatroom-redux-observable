import {ActionTypes} from "../types";

export const sendPosts = state => ({
    type: ActionTypes.SEND_POST,
    payload: state
})

export const fetchPosts = () => ({
    type: ActionTypes.FETCH_POSTS,
    payload: {}
})