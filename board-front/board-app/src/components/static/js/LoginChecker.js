import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginChecker = () => {
  const navigate = useNavigate();

  function redirectToLoginPage() {
    window.location.href = '/login';
  }

  function jwtCheck(jwtToken) {
    if (!jwtToken) {
      alert('로그인 해주십시오.');
      // navigate('/login')
      redirectToLoginPage();
      return true;
    }
  }

  return <div></div>;
};

export default LoginChecker;