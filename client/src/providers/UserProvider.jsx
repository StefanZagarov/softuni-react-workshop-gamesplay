import React from "react";
import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider(
    // children is an automatic property (no need to give it, it is always provided), it holds everything that is passed between the opening and closing tag of UserProvider
    { children }) {

    const [authData, setAuthData] = usePersistedState(`auth`, '');

    function userLoginHandler(resultData) {
        setAuthData(resultData);
    }

    function userLogoutHandler() {
        setAuthData('');
    }

    return (
        // Return a provider
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
            {children}
        </UserContext.Provider>
    );
}