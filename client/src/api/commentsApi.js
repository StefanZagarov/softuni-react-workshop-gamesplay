import { useEffect, useReducer, useState } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/requester";

const baseUrl = `http://localhost:3030/data/comments`;

export default {
    create(email, gameId, comment) {
        return request.post(baseUrl, { email, gameId, comment });
    }
};

function commentsReducer(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.payload];
        case 'GET_ALL':
            return action.payload;
        default:
            return state;
    }
};

export function useComments(gameId) {
    const { request } = useAuth();
    // const [comments, setComments] = useState([]);
    const [comments, dispatch] = useReducer(commentsReducer, []);

    // We use useEffect because we need it to happen once on page load
    // Hooks are like extensions to functional components, so when a component that has this hook is rendered, the hook is executed
    useEffect(() => {
        const searchParams = new URLSearchParams({
            // Getting the specific game            
            where: `gameId=${gameId}`,
            load: `author=_ownerId:users`
        });
        // We don't want to get all comments, only the ones for the current game
        request.get(`${baseUrl}`).then((newComments) => {
            dispatch(prevComments => {
                // Only update if the comments have actually changed
                return JSON.stringify(prevComments) !== JSON.stringify(newComments) ? newComments : prevComments;
            });
        });
    }, [request, gameId]);

    return {
        comments,
        addComment: (commentData) => dispatch({ type: 'ADD_COMMENT', payload: commentData })
    };
}

export function useCreateComment() {
    const { request } = useAuth();

    function create(gameId, comment) {
        const commentData = {
            gameId,
            comment
        };

        return request.post(baseUrl, commentData);
    }

    return create;
}