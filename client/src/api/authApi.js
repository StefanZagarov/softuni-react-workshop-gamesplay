// Custom hook to handle login

import { useEffect, useRef } from "react";
import requester from "../utils/requester";

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