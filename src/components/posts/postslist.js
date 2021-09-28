import React from "react";
import {Container, Row, Table} from "react-bootstrap";
import {connect} from "react-redux";
import { poolPostsStart, poolPostsStop} from "../../actions/postActions";
import {Statuses} from "../../types";

class PostsList extends React.Component{

    /**
     * component Did Mount
     */
    componentDidMount() {
        this.props.poolPostsStart()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.status === Statuses.FETCHING_STATUS_COMPLETED)
            setTimeout(function() { //
                console.log("restart the pool")
                this.props.poolPostsStart()
            }.bind(this), 20000)
    }


    /**
     * render the list of the post
     * @returns {JSX.Element}
     */
    renderPosts = () => {


        return (

            <div>
                <Container>
                    <Row>
                        <Table>
                            <thead>
                            <tr>
                                <th>Time</th>
                                <th>Sender</th>
                                <th>Topic</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.props.posts.map((post) => (
                                <tr>
                                    <td>{post.time}</td>
                                    <td>{post.username}</td>
                                    <td>{post.topic}</td>
                                    <td>{post.message}</td>
                                </tr>
                            ))}
                            </tbody>

                        </Table>
                    </Row>
                </Container>
            </div>

        );
    }

    /**
     * Render the component
     * @returns {JSX.Element}
     */
    render() {
        return(
            <div>
                <Container>
                    <Row>
                                <h4>Posts</h4>
                                <hr />
                            {this.props.posts &&
                                this.props.posts.length > 0 ? (
                                this.renderPosts()
                                ) : (
                                <span>No post found</span>
                                )}

                    </Row>
                </Container>
            </div>
        );
    }
}

/**
 * mapStateToProps
 * @param state
 * @returns {{posts: ([]|*), status}}
 */
const mapStateToProps = (state) => ({
    posts: state.postListReducer.posts,
    status: state.postListReducer.status,
})

const mapDispatchToProps = dispatch => ({
    poolPostsStart: () => dispatch (poolPostsStart()),
    poolPostsStop: () => dispatch (poolPostsStop())
});
export default connect(mapStateToProps,mapDispatchToProps)(PostsList);