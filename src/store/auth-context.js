import React from 'react';

// 컴포넌트를 포함하게 될 객체인 context 생성
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // App 같은 컴포넌트에서 내용은 직접 수정할 것이므로 그냥 dummy function // IDE가 자동완성으로 onLogout을 추천해 더 편하게 코드 작성하려고 여기에 써주는 것일 뿐
  onLogin: () => {},
})

export default AuthContext;