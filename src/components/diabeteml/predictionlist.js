import {connect} from "react-redux";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {selectPrediction} from "../../reducers/diabetemlSlice";

import {PREDICT_DIABETE, STATUS_PREDICTION_RUNNING} from '../../types'

const {Component} = require("react");

class PredictionList extends Component {

    constructor(props) {
        super(props);

        this.state =  {
            id: ""
        }

        this.handleAllCheckbox = this.handleAllCheckbox.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }
    /**
     * handle all checkbox
     * @param event
     */
    handleAllCheckbox = (event) => {
        this.props.predictions.forEach((prediction) => {
            document.getElementById("chk"+prediction.id).checked = event.target.checked;
        })
    }
    /**
     * handle double click
     * @param id
     */
    handleDoubleClick = (id) => () => {
        this.props.predictions.forEach((prediction) => {
            document.getElementById("chk"+prediction.id).checked = (prediction.id===id)
        })
        document.getElementById("chkAll").checked = false
        let prediction = ""
        this.props.predictions.forEach(pred => {
            if (id === pred.id) prediction = pred
        })
        this.props.selectPrediction(prediction)
    }
    /**
     * handle run prediction
     */
    handleRunPrediction = () => {
        const allPredictions = []
        this.props.predictions.forEach(pred => {
            allPredictions.push(pred)
        })
        this.props.runPrediction(allPredictions)
    }
    /**
     * render prediction
     * @returns {*}
     */
    renderPrediction = () => {

        return (
           <div>
               <Form>
               <Container>
                   <Row>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        id="chkAll"
                                        onChange={this.handleAllCheckbox}
                                    />
                                </th>
                                <th>Name</th>
                                <th>Result</th>
                                <th>Confidence Rate(%)</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.props.predictions.map((prediction) => (
                                <tr onDoubleClick={this.handleDoubleClick(prediction.id)} key={prediction.id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id={"chk"+ prediction.id}
                                        />
                                    </td>
                                    <td>{prediction.name}</td>
                                    <td>{prediction.result}</td>
                                    <td>{prediction.confidence}</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </Table>
                   </Row>
                   <Row>

                   </Row>
                   <Row>
                       <Col>&nbsp;</Col>
                       <Col>
                       <Button variant="outline-primary" type="button" size="sm" onClick={this.handleRunPrediction} disabled={this.props.status === STATUS_PREDICTION_RUNNING}>
                           Run Prediction
                       </Button>
                       </Col>
                       <Col>&nbsp;</Col>
                   </Row>
               </Container>
               </Form>
           </div>
        );
    }
    /**
     * render
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <h4>Predictions</h4>
                        <hr />
                        {this.props.predictions &&
                        this.props.predictions.length > 0 ? (
                            this.renderPrediction()
                        ) : (
                            <span>No record found</span>
                        )}
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    predictions: state.diabeteml.predictions,
    status: state.diabeteml.status,
})
/**
 * classic mapDispatchToProps
 * @param dispatch
 * @returns {{selectPrediction: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => ({
        selectPrediction: (prediction) => dispatch(selectPrediction(prediction)),
        runPrediction: (predictions) => dispatch({
            type: PREDICT_DIABETE,
            payload: predictions
        })
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(PredictionList);
