import request from "../utils/requester";

const baseUrl = `http://localhost:3030/jsonstore/comments`;

export default {
    async getAll(gameId) {
        const allComments = await request.get(baseUrl);

        // TODO: filter when migrate to collections
        // Client filtering (dont do this)

        const gameComments = Object.values(allComments).filter(comment => comment.gameId === gameId);
        return gameComments;
    },
    create(email, gameId, comment) {
        return request.post(baseUrl, { email, gameId, comment });
    }
};