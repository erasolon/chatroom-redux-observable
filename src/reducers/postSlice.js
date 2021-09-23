import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    message: ""
}

export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        addPost(state) {
            return {
                ...state,
            }
         },
    }
})

export const { addPost  } = postSlice.actions;


export default postSlice.reducer