import { useContext, useEffect, useState } from "react";
import request from "../utils/requester";
import { UserContext } from "../contexts/UserContext";

const baseUrl = `http://localhost:3030/data/games`;

// By abstracting the fetch logic to a utility function, we make sure we dont repeat ourselves
// The service is now responsible for handling the method, url and data that is being send to the database

// export default {
//     async getAll() {
//         // In GamesCatalog we expect to get the data in an array, so we need to transform the data here to array before se send it
//         const result = await request.get(baseUrl);

//         const gamesArray = Object.values(result);
//         return gamesArray;
//     },
//     getOne(gameId) {
//         return request.get(`${baseUrl}/${gameId}`);
//     },
//     edit(gameId, gameData) {
//         // Combine the game data to include the id aswell - if data needs to be transformed, then this should happen in the service (here), not in the react component
//         return request.put(`${baseUrl}/${gameId}`, { ...gameData, _id: gameId });
//     },
//     delete(gameId) {
//         return request.delete(`${baseUrl}/${gameId}`);
//     }
// };

// Since it is a custom hook, it should start with "use"
export function useCreateGame() {

    const { accessToken } = useContext(UserContext);

    const options = {
        headers: {
            "X-Authorization": accessToken
        }
    };

    function create(gameData) {
        return request.post(baseUrl, gameData, options);
    }

    return create;
}

export function useGetAllGames() {

    const [games, setGame] = useState([]);

    useEffect(() => {
        request.get(baseUrl).then(setGame);
    }, []);

    return games;
}
