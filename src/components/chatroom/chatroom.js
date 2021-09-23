import React from "react";

import {Form, Button, ButtonGroup, Container, Row, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import {sendPosts} from "../../actions/postActions";

class Chatroom extends React.Component {

    /**
     * constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            message: '',
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
     * handle Send event
     * @param event
     */
    handlePrimaryButton = (event) => {
        if (this.state.message !==""){
            event.preventDefault();
            this.props.sendPosts(this.state)
            this.setState(this.baseState);
        }
    }

    /**
     * Render component
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <Form>
                    <Container>
                        <Row>
                            <h1>Public Chat Room</h1>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Control type="text" name="message" value={this.state.message} placeholder="Enter your post here " onChange={this.handleOnChange} required/>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <ButtonGroup>
                                    <Button variant="primary" type="button" size="sm" onClick={this.handlePrimaryButton}>
                                        send
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

const mapDispatchToProps = dispatch => ({
    sendPosts: (state) => dispatch (sendPosts(state)),
});

export default connect(null,mapDispatchToProps)(Chatroom);