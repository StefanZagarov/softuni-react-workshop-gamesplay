import { useUserContext } from "../contexts/UserContext";
import request from "../utils/requester";

// A hook function which we call when we need to do requests to the server which require an authorized user
export default function useAuth() {
    const authData = useUserContext();

    const requestWrapper = (method, url, data, options = {}) => {
        const authOptions = {
            ...options,
            headers: {
                'X-Authorization': authData.accessToken,
                ...options.headers
            }
        };

        // If we have authToken, return authOptions, otherwise use provided options - this is to stop sending undefined authToken when we don't have one
        return request.baseRequest(method, url, data, authData.accessToken ? authOptions : options);
    };

    return {
        ...authData,
        isAuthenticated: !!authData.accessToken,
        // Adding better access to a renamed _id property for better developing experience
        userId: authData._id,
        request: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            delete: requestWrapper.bind(null, 'DELETE'),
        }
    };
};
