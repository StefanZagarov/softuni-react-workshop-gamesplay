import { useEffect, useState } from "react";
import request from "../utils/requester";
import useAuth from "../hooks/useAuth";

const baseUrl = `http://localhost:3030/data/games`;

// By abstracting the fetch logic to a utility function, we make sure we dont repeat ourselves
// The custom hook is now responsible for handling the method, url and data that is being send to the database

// Since it is a custom hook, it should start with "use"
export function useCreateGame() {
    // User must be authorized to create games
    const { request } = useAuth();

    function create(gameData) {
        return request.post(baseUrl, gameData);
    }

    return create;
}

export function useGetAllGames() {

    const [games, setGame] = useState([]);

    // We use useEffect because we need it to happen once on page load
    // Hooks are like extensions to functional components, so when a component that has this hook is rendered, the hook is executed
    useEffect(() => {
        request.get(baseUrl).then(setGame);
    }, []);

    return games;
}

export function useGetLatestGames() {
    const [latestGames, setLatestGames] = useState([]);

    // We use useEffect because we need it to happen once on page load
    // Hooks are like extensions to functional components, so when a component that has this hook is rendered, the hook is executed
    // Search by parameters
    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            // Return only those properties
            select: '_id,imageUrl,title',
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestGames);
    }, []);

    return latestGames;
}

export function useGetOneGame(gameId) {
    const [game, setGame] = useState({});

    // We use useEffect because we need it to happen once on page load
    // Hooks are like extensions to functional components, so when a component that has this hook is rendered, the hook is executed
    useEffect(() => {
        request.get(`${baseUrl}/${gameId}`).then(setGame);
    }, [gameId]);

    return game;
}

export function useEditGame() {
    const { request } = useAuth();
    // User must be authorized to edit the game
    // Since the logic of getting the auth token is the same for create and edit, we can create a custom hook that reuses the same logic
    // The request function automatically injects the token
    function edit(gameId, gameData) {
        return request.put(`${baseUrl}/${gameId}`, { ...gameData, _id: gameId });
    };

    return edit;
}

export function useDeleteGame() {
    const { request } = useAuth();

    function deleteGame(gameId) {
        return request.delete(`${baseUrl}/${gameId}`);
    }

    return deleteGame;
}
