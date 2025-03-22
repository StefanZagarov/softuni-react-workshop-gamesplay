import { createContext } from "react";

export const UserContext = createContext({
    // Set default values for the context
    _id: '',
    email: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null
});