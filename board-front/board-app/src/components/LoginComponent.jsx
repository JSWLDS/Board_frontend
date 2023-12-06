import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 여기에 로그인 로직을 추가하세요. 예: 자격 증명을 확인하기 위해 API 호출
    console.log('다음으로 로그인 중:', { username, password });
  };

  return (
    <div>
      <h2>로그인</h2>
      <form>
        <label>
          사용자 이름:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </form>
      {/* 회원가입 페이지로 이동하는 링크 */}
      <p>
        계정이 없으신가요?{' '}
        <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
