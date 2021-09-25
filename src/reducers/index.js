import { combineReducers } from 'redux'
import postReducer from './postFormSlice'
import postListReducer from './postsListSlice'

export default combineReducers({
    postReducer: postReducer,
    postListReducer: postListReducer,
})

