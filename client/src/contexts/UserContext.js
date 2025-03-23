import { createContext, useContext } from "react";

export const UserContext = createContext({
  // Set default values for the context
  _id: '',
  email: '',
  accessToken: '',
  userLoginHandler: () => null,
  userLogoutHandler: () => null
});

// Hook which allows us to use "useContext(UserContext);" without writing it every time - the idea is an easier import
export function useUserContext() {
  const data = useContext(UserContext);

  return data;
}