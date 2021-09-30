import React from "react";
import {Container, Row, Table} from "react-bootstrap";
import {connect} from "react-redux";
import { poolPostsStart, poolPostsStop} from "../../actions/postActions";
import {RefreshPosts} from "./refreshhook";
import moment from "moment";

class PostsList extends React.Component{

    /**
     * component Did Mount
     */
    componentDidMount() {
        this.props.poolPostsStart('1970-01-01-01-01-01')
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
                                <th>Topic</th>
                                <th>Username</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.props.posts.map((post) => (
                                <tr key={post.id.timestamp}>
                                    <td>{post.topic}</td>
                                    <td>{post.username}<br/>{moment(Date.now()).diff(moment(Date.parse(post.time)), "hours")} hour(s)</td>
                                    <td>{post.message}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
                <div>
                    <RefreshPosts props={this.props}/>
                </div>
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
    poolPostsStart: (date) => dispatch (poolPostsStart(date)),
    poolPostsStop: () => dispatch (poolPostsStop())
});
export default connect(mapStateToProps,mapDispatchToProps)(PostsList);