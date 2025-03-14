import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import gameService from "../../services/gameService";
import ShowComments from "../show-comments/ShowComments";
import CreateComment from "../create-comment/CreateComment";
import commentService from "../../services/commentService";

export default function GameDetails({ email }) {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Lecturer demonstrates that we can use such thing as Immedietly Invoked Async Arrow Function Expression (IIAAFE)
        (async () => {
            const result = await gameService.getOne(gameId);
            setGame(result);

            const comments = await commentService.getAll(gameId);
            setComments(comments);
        })();
    }, [gameId]);

    async function onDelete() {
        const hasConfirm = confirm(`Are you sure you want to delete ${game.title}?`);

        if (!hasConfirm) return;

        await gameService.delete(gameId);

        navigate("/games");
    }

    function commentCreateHandler(newComment) {
        setComments(oldComments => [...oldComments, newComment]);
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

                <ShowComments comments={comments} />

                {/* Edit/Delete buttons ( Only for creator of this game ) */}
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
            </div>;
            <CreateComment
                email={email}
                gameId={gameId}
                onCreate={commentCreateHandler}
            />
        </section >
    );
}
