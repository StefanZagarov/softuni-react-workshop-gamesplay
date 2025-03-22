import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import gameService from "../../services/gameService";
import ShowComments from "../show-comments/ShowComments";
import CreateComment from "../create-comment/CreateComment";
import commentService from "../../services/commentService";
import { UserContext } from "../../contexts/UserContext";
import { useGetOneGame } from "../../api/gameApi";

export default function GameDetails() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [comments, setComments] = useState([]);

    const { email } = useContext(UserContext);

    const game = useGetOneGame(gameId);

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
