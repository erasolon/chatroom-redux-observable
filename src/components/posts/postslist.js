import React from "react";
import {Container, Row, Table} from "react-bootstrap";
import {connect} from "react-redux";
import {fetchPosts, sendPosts, unSendPosts} from "../../actions/postActions";

class PostsList extends React.Component{

    constructor(props){
        super(props);
    }

    /**
     * component Did Mount
     */
    componentDidMount() {
        this.props.fetchPosts()
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
                                <tr okey={post.id}>
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

/**
 * mapDispatchToProps
 * @param dispatch
 * @returns {{fetchPosts: (function(): *)}}
 */
const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch (fetchPosts()),
});

export default connect(mapStateToProps,mapDispatchToProps)(PostsList);