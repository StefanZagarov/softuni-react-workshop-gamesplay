// Custom hook to handle login

import { useContext, useEffect, useRef } from "react";
import requester from "../utils/requester";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

// This is an "event hook", meaning we want to return a function that will be called when the form is submitted
export function useLogin() {
    // We can create an abort controller here
    const abortRef = useRef(new AbortController());

    async function login(email, password) {
        return await requester.post(
            `${baseUrl}/login`,
            { email, password },
            { signal: abortRef.current.signal });
    }

    // Call the abort controller
    useEffect(() => {
        const abortController = abortRef.current;
        // Return the result of the abort controller
        return () => abortController.abort();
        // The useEffect wants us to pass the abort controller as a dependency, so we use "ref" to avoid the problem
    }, []);

    return login;
}

export function useRegister() {
    // Abort controller for avoiding duplicate requests
    const abortRef = useRef(new AbortController());

    async function register(email, password) {
        return await requester.post(
            `${baseUrl}/register`,
            { email, password },
            { signal: abortRef.current.signal });
    }

    // Trigger the abort on duplicate requests
    useEffect(() => {
        const abortController = abortRef.current;
        return () => abortController.abort();
    }, []);

    return register;
}

export function useLogout() {
    // Abort controller for avoiding duplicate requests
    const abortRef = useRef(new AbortController());

    const { accessToken, userLogoutHandler } = useContext(UserContext);

    // Using useEffect to send the logout request and invalidate the session immedietly on logout click
    useEffect(() => {
        // Stop infinite loop
        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        };

        // Send null as the second argument because we don't need to send any data, the options contain the needed "X-Authorization" header
        requester.get(`${baseUrl}/logout`, null, options)
            // Remove the data from the context
            .then(userLogoutHandler);

    }, [accessToken, userLogoutHandler]);

    // Trigger the abort on duplicate requests
    useEffect(() => {
        const abortController = abortRef.current;
        return () => abortController.abort();
    }, []);

    // Returns a boolean, depends on the accessToken, if it's null, then returns true, else false
    return {
        isLoggedOut: !!accessToken,
    };
}

