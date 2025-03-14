import request from "../utils/requester";

const baseUrl = `http://localhost:3030/jsonstore/comments`;

export default {
    getAll() {
        return request.get(baseUrl);
    },
    create(email, gameId, comment) {
        return request.post(baseUrl, { email, gameId, comment });
    }
};