import React from "react";

import {Form, Button, ButtonGroup, Container, Row, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import {sendPosts, unSendPosts} from "../../actions/postActions";
import {Statuses} from "../../types";

class PostForm extends React.Component {

    /**
     * constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            username: 'erasolon',
            topic: 'ML',
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
                    <Container fluid="md">
                        <Row>
                            <h1>Forum</h1>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} placeholder="Enter your username" onChange={this.handleOnChange} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Topic</Form.Label>
                                    <Form.Control type="text" name="topic" value={this.state.topic} placeholder="Enter the topic here" onChange={this.handleOnChange} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control type="textarea" rows={4} name="message" value={this.state.message} placeholder="Enter your post here" onChange={this.handleOnChange} required/>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <ButtonGroup>
                                    <Button variant="primary" type="button" size="sm" onClick={this.handlePrimaryButton} disabled={this.props.status === Statuses.POST_STATUS_PENDING}>
                                        Send
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
 * map dispatch to prop
 * @param dispatch
 * @returns {{sendPosts: (function(*=): *), unSendPosts: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    sendPosts: (state) => dispatch (sendPosts(state)),
    unSendPosts: (state) => dispatch(unSendPosts(state))
});

/**
 * Map state to props
 * @param state
 * @returns {{status}}
 */
const mapStateToProps = (state) => ({
    status: state.postReducer.status,
})

export default connect(mapStateToProps,mapDispatchToProps)(PostForm);