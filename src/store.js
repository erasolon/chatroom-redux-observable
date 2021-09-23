import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension';
import {createEpicMiddleware} from "redux-observable";

import rootEpic from "./epics/"
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware();

function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(epicMiddleware)
        )
    );

    epicMiddleware.run(rootEpic);

    return store;
}

const store = configureStore();

export default store