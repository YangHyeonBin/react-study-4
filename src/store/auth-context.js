import React, { useState, useEffect } from 'react';

// 컴포넌트를 포함하게 될 객체인 context 생성
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // App 같은 컴포넌트에서 내용은 직접 수정할 것이므로 그냥 dummy function // IDE가 자동완성으로 onLogout을 추천해 더 편하게 코드 작성하려고 여기에 써주는 것일 뿐
  onLogin: (email, password) => {},
});

// 로그인, 로그아웃 관련 모든 state 여기에 정의 -> 다른 컴포넌트의 코드 더 간결하게 수정 가능
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
