import {createSlice} from "@reduxjs/toolkit";
import {postFormSlice} from "./postFormSlice";
import {Statuses} from "../types";

const initialState = {
    posts: [],
    status: Statuses.FETCHING_STATUS_IDLE,
    error: ""
}

export const postsListSlice = createSlice ({
        name:"postsListSlice",
        initialState,
        reducers: {
            newPost(state,action) {
                return ({
                    ...state,
                    posts: [ ...state.posts,action.payload],
                    status: Statuses.POST_STATUS_PENDING,
                    error: "",
                })
            },
            errorFetchingPost(state,action) {
                return ({
                    ...state,
                    status: Statuses.FETCHING_STATUS_ERROR,
                    error: action.payload,
                })
            },
            completedFetchingPost(state) {
                return ({
                    ...state,
                    status: Statuses.FETCHING_STATUS_COMPLETED
                })
            },
        }
    }
)

export const { newPost, errorFetchingPost, completedFetchingPost } = postsListSlice.actions;

export default postsListSlice.reducer