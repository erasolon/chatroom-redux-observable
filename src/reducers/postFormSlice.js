import {createSlice} from "@reduxjs/toolkit";
import {Statuses} from "../types";

const initialState = {
    status: Statuses.POST_STATUS_IDLE,
    error: ""
}

export const postFormSlice = createSlice({
    name: "postFormSlice",
    initialState,
    reducers: {
        addPostCompleted (state) {
                return {
                    status:Statuses.POST_STATUS_COMPLETED,
                    error: ""
                }
            },
        addPostError (state, action) {
            return {
                status:Statuses.POST_STATUS_ERROR,
                error: action.payload.error
            }
        },
        addPostPending (state) {
            return {
                status:Statuses.POST_STATUS_PENDING,
                error: ""
            }
        },
        addPostCancelled (state) {
            return {
                status:Statuses.POST_STATUS_IDLE,
                error: ""
            }
        },

    }
})

export const { addPostCompleted, addPostError, addPostPending, addPostCancelled } = postFormSlice.actions;

export default postFormSlice.reducer