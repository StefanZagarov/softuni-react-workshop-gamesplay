import { useUserContext } from "../contexts/UserContext";
import request from "../utils/requester";

export default function useAuth() {
    const authData = useUserContext;

    const requestWrapper = (method, url, data, options = {}) => {
        const authOptions = {
            ...options,
            headers: {
                'X-Authorization': authData.accessToken,
                ...options.headers
            }
        };

        // If we have authToken, return authOpetions, otherwise return options - this is to stop sending undefined authToken when we don't have one
        return request.baseRequest(method, url, data, authData.accessToken ? authOptions : options);
    };

    return {
        ...authData,
        request: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            delete: requestWrapper.bind(null, 'DELETE'),
        }
    };
};
