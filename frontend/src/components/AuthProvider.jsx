import React, { useCallback, useState } from "react";
import { AuthContext } from "../hooks/AuthContext";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: "", user: {} });

  const onChangeAuthStatus = useCallback(({ token, user }) => {
    setAuth({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, onChangeAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
