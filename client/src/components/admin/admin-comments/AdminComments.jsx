import { Component } from "react";
import requester from "../../../utils/requester";
import CommentItem from "./comment-item/CommentItem";

const commentsBaseUrl = `http://localhost:3030/data/comments`;

export default class AdminComments extends Component {

    // 1. Initialization
    constructor(props) {
        console.log(`Component initialization`);
        super(props);

        // Define state
        this.state = {
            comments: [{ text: `Test` }],
            name: `Pesho`
        };
    };

    // 2. Mount
    async componentDidMount() {
        console.log(`Component mounted`);
        const comments = await requester.get(commentsBaseUrl);
        this.setState({ comments }, () => console.log(this.state.comments));
    }

    // 3. Update
    componentDidUpdate() {
        console.log('Component updated');
    }

    deleteCommentHandler(commentId) {
        console.log('delete ', commentId);

        this.setState({
            comments: this.state.comments.filter(comment => comment._id !== commentId)
        });
    }

    render() {
        return (
            <ul>
                {this.state.comments.map(comment => (
                    <CommentItem
                        key={comment._id}
                        id={comment._id}
                        comment={comment.comment}
                        onDelete={this.deleteCommentHandler.bind(this)}
                    />
                ))}
            </ul>
        );
    }
}