import { createContext } from "react";

export const AuthContext = createContext({
  token: "",
  user: {},
  onChangeAuthStatus: ({ token, user }) => {},
});
