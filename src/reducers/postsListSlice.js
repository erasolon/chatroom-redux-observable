import {createSlice} from "@reduxjs/toolkit";
import {Statuses} from "../types";

const initialState = {
    posts: [],
    status: Statuses.FETCHING_STATUS_IDLE,
    error: "",
    lastRun: "",
}

export const postsListSlice = createSlice ({
        name:"postsListSlice",
        initialState,
        reducers: {
            newPost(state,action) {
                return ({
                    ...state,
                    posts: [ ...state.posts,action.payload],
                    status: Statuses.FETCHING_STATUS_PENDING,
                    error: "",
                })
            },
            errorFetchingPost(state,action) {
                return ({
                    ...state,
                    status: Statuses.FETCHING_STATUS_ERROR,
                    error: action.payload,
                    lastRun: Date.now(),
                })
            },
            completedFetchingPost(state) {
                return ({
                    ...state,
                    status: Statuses.FETCHING_STATUS_COMPLETED,
                    lastRun: Date.now(),
                })
            },
        }
    }
)

export const { newPost, errorFetchingPost, completedFetchingPost } = postsListSlice.actions;

export default postsListSlice.reducer