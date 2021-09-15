import { put, takeEvery, call  } from 'redux-saga/effects'

import { diabetemlAPI } from '../api-calls/'
import {predictionErrorAction, predictionOkAction, predictionRunningAction} from "../actions/diabeteml-actions";

import { PREDICT_DIABETE } from '../types'


function* predictDiabete(inputs) {
    try {
        yield put(predictionRunningAction())
        const result  = yield call(diabetemlAPI, inputs.payload)
        yield put(predictionOkAction(result))
    } catch(error) {
        yield put(predictionErrorAction())
    }
}

export function* predictDiabeteSaga() {
    yield takeEvery(PREDICT_DIABETE, predictDiabete)
}

