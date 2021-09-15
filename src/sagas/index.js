import { all } from 'redux-saga/effects'

import { predictDiabeteSaga } from './diabeteSagas'

// Export all sagas
export default function* rootSaga() {
    yield all([
        predictDiabeteSaga(),
    ])
}