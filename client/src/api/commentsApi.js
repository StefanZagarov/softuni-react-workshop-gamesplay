import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/requester";

const baseUrl = `http://localhost:3030/data/comments`;

export default {
    create(email, gameId, comment) {
        return request.post(baseUrl, { email, gameId, comment });
    }
};

export function useComments(gameId) {
    const { request } = useAuth();
    const [comments, setComments] = useState([]);

    // We use useEffect because we need it to happen once on page load
    // Hooks are like extensions to functional components, so when a component that has this hook is rendered, the hook is executed
    useEffect(() => {
        const searchParams = new URLSearchParams({
            // Getting the specific game            
            where: `gameId=${gameId}`,
            load: `author=_ownerId:users`
        });
        // We don't want to get all comments, only the ones for the current game
        request.get(`${baseUrl}?${searchParams.toString()}`).then((newComments) => {
            setComments(prevComments => {
                // Only update if the comments have actually changed
                return JSON.stringify(prevComments) !== JSON.stringify(newComments) ? newComments : prevComments;
            });
        });
    }, [request, gameId]);

    return comments;
}