export default function CreateComment() {
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form">
                <textarea name="comment" placeholder="Comment......" defaultValue={""} />
                <input className="btn submit" type="submit" defaultValue="Add Comment" />
            </form>
        </article>
    );
}