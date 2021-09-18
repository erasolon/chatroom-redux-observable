import {Form, Button, ButtonGroup, Container, Row, Col, Alert} from 'react-bootstrap';
import {addPrediction, deletePrediction, savePrediction} from "../../reducers/diabetemlSlice";
import { connect } from "react-redux";
import {Component} from "react";

// CSV_COLUMNS =  ['age','gender','polyuria','polydipsia','sudden_weight_loss', 'weakness', 'polyphagia', 'genital_thrush', 'visual_blurring','itching','irritability', 'delayed_healing', 'partial_paresis', 'muscle_stiffness', 'alopecia', 'obesity', 'cls']

class Diabeteml extends Component {

    fields =  ['age','gender','polyuria','polydipsia','sudden_weight_loss', 'weakness', 'polyphagia', 'genital_thrush', 'visual_blurring','itching','irritability', 'delayed_healing', 'partial_paresis', 'muscle_stiffness', 'alopecia', 'obesity']

    /**
     * constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.state = {
            id: "",
            age: "",
            name: "",
            polyuria: "",
            gender: "",
            polydipsia: "",
            sudden_weight_loss: "",
            weakness: "",
            polyphagia: "",
            genital_thrush: "",
            visual_blurring: "",
            itching: "",
            irritability: "",
            delayed_healing: "",
            partial_paresis: "",
            muscle_stiffness: "",
            alopecia: "",
            obesity: "",
            missingValues: false,
        }
        this.baseState = this.state
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    /**
     * handle Onchange event from inputs
     * @param event
     */
    handleOnChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }
    /**
     * handle addevent
     * @param event
     */
    handlePrimaryButton = (event) => {
        if (this.validateForm()){
            event.preventDefault();
            this.state.id === ""?this.props.addPrediction(this.state):this.props.savePrediction(this.state)
            this.handleReset()
        } else {
            this.setState({missingValues : true})
        }

    }
    /**
     * handleDelete
     * @param event
     */
    handleDelete = (event) => {
        event.preventDefault();
        if(this.state.id !== "")
            this.props.deletePrediction(this.state)
        this.handleReset()
    }

    /**
     * Handle reset
     */
    handleReset = () =>{
        this.setState(this.baseState)
    }
    /**
     * classic componentDidUpdate
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.prediction && this.props.prediction !== prevProps.prediction) {
            this.setState({
                id: this.props.prediction.id,
                age: this.props.prediction.age,
                name: this.props.prediction.name,
                polyuria: this.props.prediction.polyuria,
                gender: this.props.prediction.gender,
                polydipsia: this.props.prediction.polydipsia,
                sudden_weight_loss: this.props.prediction.sudden_weight_loss,
                weakness: this.props.prediction.weakness,
                polyphagia: this.props.prediction.polyphagia,
                genital_thrush: this.props.prediction.genital_thrush,
                visual_blurring: this.props.prediction.visual_blurring,
                itching: this.props.prediction.itching,
                irritability: this.props.prediction.irritability,
                delayed_healing: this.props.prediction.delayed_healing,
                partial_paresis: this.props.prediction.partial_paresis,
                muscle_stiffness: this.props.prediction.muscle_stiffness,
                alopecia: this.props.prediction.alopecia,
                obesity: this.props.prediction.obesity
            })
        }
    }

    /**
     * Validate form
     * @returns {boolean}
     */
    validateForm = () => {

        for (let i = 0; i < this.fields.length; i++) {
            if ( this.state[this.fields[i]] === "") {
                return false;
            }
        }
        return true;
    }

    /**
     * render error message
     * @returns {JSX.Element}
     */
    renderError() {
        return (
            <div>
                <Alert key="23" variant="warning">One or more missing values. All fields are mandatory</Alert>
            </div>
        );
    }

    /**
     * render the component
     * @returns {JSX.Element}
     */
    render() {
        let primaryButton = "Add Prediction"
        if (this.state.id !== "")
            primaryButton = "Save Change"

        let  errorMessage = ""
        if (this.state.missingValues)
            errorMessage = this.renderError();

        return (
            <div>
                <Form>
                    <Container>
                        <Row>
                            <h1>Diabete Prediction</h1>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control type="text" name="name" value={this.state.name} placeholder="Enter Name" onChange={this.handleOnChange} required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formAge">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="number" name="age" value={this.state.age} placeholder="Enter Age" onChange={this.handleOnChange} required/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Gender</Form.Label>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Check type="radio" name="gender" value="1" checked={this.state.gender === "1"} label="Male" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="gender" value="0" checked={this.state.gender === "0"} label="Female" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Polyuria</Form.Label>
                                <Form.Group className="mb-3" controlId="formPolyuria">
                                    <Form.Check type="radio" name="polyuria" value="0" checked={this.state.polyuria === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="polyuria" value="1" checked={this.state.polyuria === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Polydipsia</Form.Label>
                                <Form.Group className="mb-3" controlId="formPolydipsia">
                                    <Form.Check type="radio" name="polydipsia" value="0" checked={this.state.polydipsia === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="polydipsia" value="1" checked={this.state.polydipsia === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Sudden Weight Loss</Form.Label>
                                <Form.Group className="mb-3" controlId="formLossOfWeight">
                                    <Form.Check type="radio" name="sudden_weight_loss" checked={this.state.sudden_weight_loss === "0"} value="0" label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="sudden_weight_loss" checked={this.state.sudden_weight_loss === "1"} value="1" label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Weakness</Form.Label>
                                <Form.Group className="mb-3" controlId="formWeakness">
                                    <Form.Check type="radio" name="weakness" value="0" checked={this.state.weakness === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="weakness" value="1" checked={this.state.weakness === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Polyphagia</Form.Label>
                                <Form.Group className="mb-3" controlId="formPolyphagia">
                                    <Form.Check type="radio" name="polyphagia" value="0" checked={this.state.polyphagia === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="polyphagia" value="1" checked={this.state.polyphagia === "1"}  label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Genital thrush</Form.Label>
                                <Form.Group className="mb-3" controlId="formGenitalThrush">
                                    <Form.Check type="radio" name="genital_thrush" value="0" checked={this.state.genital_thrush === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="genital_thrush" value="1" checked={this.state.genital_thrush === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Visual Blurring</Form.Label>
                                <Form.Group className="mb-3" controlId="formVisualBlurring">
                                    <Form.Check type="radio" name="visual_blurring" value="0" checked={this.state.visual_blurring === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="visual_blurring" value="1" checked={this.state.visual_blurring === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Itching</Form.Label>
                                <Form.Group className="mb-3" controlId="formItching">
                                    <Form.Check type="radio" name="itching" value="0" checked={this.state.itching === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="itching" value="1" checked={this.state.itching === "1"}  label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Irritability</Form.Label>
                                <Form.Group className="mb-3" controlId="formIrritability">
                                    <Form.Check type="radio" name="irritability" value="0" checked={this.state.irritability === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="irritability" value="1" checked={this.state.irritability === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Delayed healing</Form.Label>
                                <Form.Group className="mb-3" controlId="formDelayedHealing">
                                    <Form.Check type="radio" name="delayed_healing" value="0" checked={this.state.delayed_healing === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="delayed_healing" value="1" checked={this.state.delayed_healing === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Partial paresis</Form.Label>
                                <Form.Group className="mb-3" controlId="formPartialParesis">
                                    <Form.Check type="radio" name="partial_paresis" value="0" checked={this.state.partial_paresis === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="partial_paresis" value="1" checked={this.state.partial_paresis === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Muscle Stiffness</Form.Label>
                                <Form.Group className="mb-3" controlId="formMuscleStiffness">
                                    <Form.Check type="radio" name="muscle_stiffness" value="0" checked={this.state.muscle_stiffness === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="muscle_stiffness" value="1" checked={this.state.muscle_stiffness === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Alopecia</Form.Label>
                                <Form.Group className="mb-3" controlId="formAlopecia">
                                    <Form.Check type="radio" name="alopecia" value="0" checked={this.state.alopecia === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="alopecia" value="1" checked={this.state.alopecia === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Obesity</Form.Label>
                                <Form.Group className="mb-3" controlId="formObesity">
                                    <Form.Check type="radio" name="obesity" value="0" checked={this.state.obesity === "0"} label="No" onChange={this.handleOnChange}/>
                                    <Form.Check type="radio" name="obesity" value="1" checked={this.state.obesity === "1"} label="Yes" onChange={this.handleOnChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                &nbsp;
                            </Col>
                        </Row>
                        <Row>
                            {errorMessage}
                        </Row>
                        <Row>

                            <Col>

                                <ButtonGroup>
                                    <Button variant="primary" type="button" size="sm" onClick={this.handlePrimaryButton}>
                                        {primaryButton}
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" type="button" size="sm" onClick={this.handleDelete}>
                                        Delete
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="info" type="button" size="sm" onClick={this.handleReset}>
                                        Reset
                                    </Button>
                                </ButtonGroup>
                            </Col>
                            <Col>&nbsp;</Col>
                        </Row>
                    </Container>

                </Form>
            </div>
        );
    }

}
/**
 * standard mapDispatchtoprops
 * @param dispatch
 * @returns {{addPrediction: (function(*, *): *)}}
 */
const mapDispatchToProps = dispatch => ({
    addPrediction: (state) => dispatch (addPrediction(state)),
    savePrediction: (state) => dispatch (savePrediction(state)),
    deletePrediction: (state) => dispatch (deletePrediction(state)),
});
/**
 * standard maptostatetoprops
 * @param state
 * @returns {{prediction: (null|*)}}
 */
const mapStateToProps = (state) => ({
    prediction: state.diabeteml.prediction
});

export default connect(mapStateToProps,mapDispatchToProps)(Diabeteml);








