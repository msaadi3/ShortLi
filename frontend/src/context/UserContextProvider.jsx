import { useState } from 'react';
import UserContext from './UserContext.js';
const UserContextProvider = ({ children }) => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <UserContext.Provider
      value={{
        isLoginPage,
        setIsLoginPage,
        isLogin,
        setIsLogin,
        userName,
        setUserName,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
