export default function CreateComment({ onCreate }) {

    async function commentAction(formData) {
        const comment = formData.get("comment");

        onCreate(comment);
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