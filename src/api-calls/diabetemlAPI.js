// A mock function to mimic making an async request for data
import * as tf from "@tensorflow/tfjs";

/**
 * predict API
 * @param model
 * @param features
 * @returns {Promise<{result: (string), confidence: number, id}>}
 */
async function predictAPI(model, features) {

    let predictionResult = features;

    const visual_blurring = parseInt(features.visual_blurring)
    const sudden_weight_loss = parseInt(features.sudden_weight_loss)
    const polydipsia = parseInt(features.polydipsia)
    const gender = parseInt(features.gender)
    const polyuria = parseInt(features.polyuria)
    const itching = parseInt(features.itching)
    const obesity = parseInt(features.obesity)
    const age = parseInt(features.age)
    const delayed_healing = parseInt(features.delayed_healing)
    const muscle_stiffness = parseInt(features.muscle_stiffness)
    const weakness = parseInt(features.weakness)
    const partial_paresis = parseInt(features.partial_paresis)
    const irritability = parseInt(features.irritability)
    const genital_thrush = parseInt(features.genital_thrush)
    const alopecia = parseInt(features.alopecia)
    const polyphagia = parseInt(features.polyphagia)

    let input = tf.tensor([[visual_blurring, sudden_weight_loss, polydipsia, gender, polyuria, itching, obesity, age, delayed_healing, muscle_stiffness, weakness, partial_paresis, irritability, genital_thrush, alopecia, polyphagia]]);
    let res = await model.predict(input)
    predictionResult =  {
        ...predictionResult,
        result: res.dataSync()[0] > 0.5 ? "Positive" : "Negative",
        confidence: res.dataSync()[0] > res.dataSync()[1] ? Math.round(res.dataSync()[0] * 100) : Math.round(res.dataSync()[1] * 100)
    }
    return predictionResult;

}

/**
 * diabeteAPI call
 * @param actions
 * @returns {Promise<*[]>}
 */
async function diabetemlAPI(actions)  {

    const predictions = actions;
    const MODEL_URL = '/model/model.json';
    const model = await tf.loadLayersModel(MODEL_URL);
    const result = [];
    for(let i = 0; i < predictions.length ; i++ ) {
        await predictAPI(model,predictions[i]).then(res => result.push(res))
    }
    return result;

}

export {diabetemlAPI}
