import { Link, useNavigate, useParams } from "react-router";
import ShowComments from "../show-comments/ShowComments";
import CreateComment from "../create-comment/CreateComment";
import { useDeleteGame, useGetOneGame } from "../../api/gameApi";
import useAuth from "../../hooks/useAuth";
import { useComments, useCreateComment } from "../../api/commentsApi";
import { useOptimistic } from "react";
import { v4 as uuid } from "uuid";

export default function GameDetails() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    // Getting the email and the ID of the creator from the authData from the useAuth hook
    const { email, userId } = useAuth();
    const game = useGetOneGame(gameId);
    const deleteGame = useDeleteGame();
    const create = useCreateComment();
    const { comments, addComment } = useComments(gameId);
    const [optimisticComments, setOptimisticComments] = useOptimistic(comments, (state, newComment) => [...state, newComment]);

    const isOwner = userId === game._ownerId;

    async function onDelete() {
        const hasConfirm = confirm(`Are you sure you want to delete ${game.title}?`);

        if (!hasConfirm) return;

        await deleteGame(gameId);

        navigate("/games");
    }

    async function commentCreateHandler(formData) {
        // Get the comment from the formData - it needs to be directly from the form action
        const comment = formData.get('comment');

        // Optimistic update
        // 1. Create an optimistic comment
        const newOptimisticComment = {
            // Generate random id
            _id: uuid(),
            _ownerId: userId,
            gameId,
            comment,
            // Keep a boolean which will differentiate this as an optimistic value
            pending: true,
            author: {
                email
            }
        };
        // 2. Before reaching the server, we will update our optimistic comments
        setOptimisticComments(newOptimisticComment);

        // 3. Server update
        const commentResult = await create(gameId, comment);

        // 4. Local state update
        // Prevent breaking the author property we get from the server
        addComment({ ...commentResult, author: { email } });
    }

    return (
        < section id="game-details" >
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>

                <ShowComments comments={optimisticComments} />

                {/* Edit/Delete buttons ( Only for creator of this game ) */}
                {isOwner &&
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">
                            Edit
                        </Link>
                        <button
                            onClick={onDelete}
                            className="button"
                        >
                            Delete
                        </button>
                    </div>
                }
            </div>
            {userId &&
                <CreateComment
                email={email}
                gameId={gameId}
                onCreate={commentCreateHandler}
            />
            }
            
        </section >
    );
}
