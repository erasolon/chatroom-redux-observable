import { createSlice, nanoid} from "@reduxjs/toolkit";
import {STATUS_PREDICTION_COMPLETED, STATUS_PREDICTION_IDLE, STATUS_PREDICTION_RUNNING} from "../types";

const initialState = {
    predictions: [],
    prediction: null,
    status: STATUS_PREDICTION_IDLE
};

export const diabetemlSlice = createSlice({
    name: 'diabeteml',
    initialState,
    reducers: {
       addPrediction: {
           reducer(state,action){
               return {
                   ...state,
                   prediction: null,
                   predictions: [...state.predictions, action.payload]
               }
           },
           prepare(state) {
               return {
                   payload: {
                       id: nanoid(),
                       age: state.age,
                       name: state.name,
                       polyuria: state.polyuria,
                       gender: state.gender,
                       polydipsia: state.polydipsia,
                       sudden_weight_loss: state.sudden_weight_loss,
                       weakness: state.weakness,
                       polyphagia: state.polyphagia,
                       genital_thrush: state.genital_thrush,
                       visual_blurring: state.visual_blurring,
                       itching: state.itching,
                       irritability: state.irritability,
                       delayed_healing: state.delayed_healing,
                       partial_paresis: state.partial_paresis,
                       muscle_stiffness: state.muscle_stiffness,
                       alopecia: state.alopecia,
                       obesity: state.obesity,
                       result: "",
                       confidence : ""
                   }
               }
           }
       },

        deletePrediction: {
            reducer(state,action){
                return {
                    ...state,
                    prediction: null,
                    predictions: state.predictions.filter(item => item.id !== action.payload.id)
                }
            },
            prepare(state) {
                return {
                    payload: {
                        id: state.id,
                    }
                }
            }
        },
        savePrediction: {
            reducer(state,action){
                return {
                    ...state,
                    prediction: null,
                    predictions: state.predictions.map(item => item.id === action.payload.id ? action.payload: item)
                }
            },
            prepare(state) {
                return {
                    payload: {
                        id: state.id,
                        age: state.age,
                        name: state.name,
                        polyuria: state.polyuria,
                        gender: state.gender,
                        polydipsia: state.polydipsia,
                        sudden_weight_loss: state.sudden_weight_loss,
                        weakness: state.weakness,
                        polyphagia: state.polyphagia,
                        genital_thrush: state.genital_thrush,
                        visual_blurring: state.visual_blurring,
                        itching: state.itching,
                        irritability: state.irritability,
                        delayed_healing: state.delayed_healing,
                        partial_paresis: state.partial_paresis,
                        muscle_stiffness: state.muscle_stiffness,
                        alopecia: state.alopecia,
                        obesity: state.obesity,
                        result: state.result,
                        confidence : state.confidence
                    }
                }
            }
        },
        selectPrediction: {
            reducer: (state, action) =>  {
                return {
                    ...state,
                    prediction: action.payload.prediction,
                }
            },
            prepare(state) {
                return {
                    payload: {
                        prediction: {
                            id: state.id,
                            age: state.age,
                            name: state.name,
                            polyuria: state.polyuria,
                            gender: state.gender,
                            polydipsia: state.polydipsia,
                            sudden_weight_loss: state.sudden_weight_loss,
                            weakness: state.weakness,
                            polyphagia: state.polyphagia,
                            genital_thrush: state.genital_thrush,
                            visual_blurring: state.visual_blurring,
                            itching: state.itching,
                            irritability: state.irritability,
                            delayed_healing: state.delayed_healing,
                            partial_paresis: state.partial_paresis,
                            muscle_stiffness: state.muscle_stiffness,
                            alopecia: state.alopecia,
                            obesity: state.obesity,
                            result: state.result,
                            confidence : state.confidence
                        }
                    }
                }
            }
        },
        predictionOk (state, action){
                return {
                    ...state,
                    prediction: null,
                    predictions: action.payload,
                    status: STATUS_PREDICTION_COMPLETED
                }
            },
        predictionRunning (state){
            return {
                ...state,
                status: STATUS_PREDICTION_RUNNING
            }
        },
        
    }
});

export const { addPrediction, deletePrediction, savePrediction, selectPrediction } = diabetemlSlice.actions;

export default diabetemlSlice.reducer;