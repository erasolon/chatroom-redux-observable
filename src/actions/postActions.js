import {ActionTypes} from "../types";

export const sendPosts = state => ({
    type: ActionTypes.POST_CREATE,
    payload: state
})

export const fetchPosts = () => ({
    type: ActionTypes.FETCH_POSTS,
    payload: {}
})

export const successPost = post => ({
    type: ActionTypes.POST_CREATE_SUCCESS,
    payload: post
})

export const errorPost = post => ({
    type: ActionTypes.POST_CREATE_ERROR,
    payload: post
})

export const completedPost = () => ({
    type: ActionTypes.POST_CREATE_COMPLETED,
    payload: {}
})