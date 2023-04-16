import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext({});

const LoginProvider = ({ children }:any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [isSuperUser ,setSuperUser] = useState('');
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn,
              profile, setProfile,
              isSuperUser,setSuperUser
                    }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;