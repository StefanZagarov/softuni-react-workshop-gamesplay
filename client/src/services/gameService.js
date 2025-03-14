import request from "../utils/requester";

const baseUrl = `http://localhost:3030/jsonstore/games`;

// By abstracting the fetch logic to a utility function, we make sure we dont repeat ourselves
// The service is now responsible for handling the method, url and data that is being send to the database
export default {
    async getAll() {
        // In GamesCatalog we expect to get the data in an array, so we need to transform the data here to array before se send it
        const result = await request.get(baseUrl);

        const gamesArray = Object.values(result);
        return gamesArray;
    },
    getOne(gameId) {
        return request.get(`${baseUrl}/${gameId}`);
    },
    create(gameData) {
        // Using the abstracted requester module to make a POST request to the server
        // It does not need to be awaiting here since where it is being called, and the request util function is being awaited
        return request.post(baseUrl, gameData);
    }
};