export default function CreateComment({ onCreate }) {
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={onCreate}>
                <textarea name="comment" placeholder="Comment......" defaultValue={""} />
                <input className="btn submit" type="submit" defaultValue="Add Comment" />
            </form>
        </article>
    );
}