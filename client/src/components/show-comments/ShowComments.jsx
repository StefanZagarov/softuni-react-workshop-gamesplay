export default function ShowComments({ comments }) {
    return (
        < div className="details-comments" >
            <h2>Comments:</h2>
            <ul>
                {comments.length > 0 ?
                    comments.map(({ _id, _ownerId, comment, pending }) => (
                        < li key={_id} className="comment" style={{ backgroundColor: pending ? 'lightgray' : '' }}>
                            <p>{_ownerId}:{comment}</p>
                        </li>
                    ))

                    : <p className="no-comment">No comments.</p>}
            </ul>
        </div >
    );
}