import { combineReducers } from 'redux'
import diabetemlReducer from './diabetemlSlice'

export default combineReducers({
    diabeteml: diabetemlReducer,
})