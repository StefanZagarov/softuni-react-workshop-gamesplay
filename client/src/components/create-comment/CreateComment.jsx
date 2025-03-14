import commentService from "../../services/commentService";

export default function CreateComment({ email, gameId, onCreate }) {

    async function commentAction(formData) {
        const comment = formData.get("comment");

        const createdComment = await commentService.create(email, gameId, comment);

        onCreate(createdComment);
    }

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={commentAction}>
                <textarea name="comment" placeholder="Comment......" defaultValue={""} />
                <input className="btn submit" type="submit" defaultValue="Add Comment" />
            </form>
        </article>
    );
}