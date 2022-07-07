import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // 로그인 정보 제출할 때=버튼 누름=이 함수 실행 -> 이 실행 시 로그인 여부 저장 적절
    // localStorage에 로그인 유무 정보 저장
    // 1 = O, 0 = X
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider // AuthContext에 .Provider를 붙인 것은 컴포넌트가 되어, JSX 구문에서 사용 가능 // 이 앱의 모든 컴포넌트에서 AuthContext의 isLoggedIn에 접근 필요 -> 가장 부모인 App에서 모든 컴포넌트들을 AuthContext.Provider로 감싸줌
      value = {{
        isLoggedIn: isLoggedIn, // 객체에서의 값(value)은 App 컴포넌트에서 정의한 state를 가리킴
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
