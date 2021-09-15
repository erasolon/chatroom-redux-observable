import {
    PREDICTION_ERROR,
    PREDICTION_OK,
    PREDICTION_RUNNING
} from "../types";
import {store} from "../store";

const predictionOk = results => ({
    type: PREDICTION_OK,
    payload: results
})

export const predictionOkAction = predictions => store.dispatch(predictionOk(predictions))

const predictionError = () => ({
    type: PREDICTION_ERROR,
    payload: true
})

export const predictionErrorAction = () => store.dispatch(predictionError())

const predictionRunning = () => ({
    type: PREDICTION_RUNNING,
    payload: true
})

export const predictionRunningAction = () => store.dispatch(predictionRunning())