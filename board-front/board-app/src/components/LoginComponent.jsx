import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기
import MemberService from '../Service/MemberService'
import Cookies from 'js-cookie';

const LoginComponent = (props) => {
  
    const navigate = useNavigate();
    const [state, setState] = useState({
        member:{
            username : "",
            password : ""
        }
    });
    
    const jwtToken = props.jwt;

    if(jwtToken){
        alert('이미 로그인 하셨습니다.')
        setTimeout(() => navigate('/'), 100);   
        return;
    }



    const handleChange = (event, field)=> {
    
        const {value} = event.target;

        setState((prevState)=>({...state, member:{...prevState.member,  [field] : value }}));
    };


    const changeUsernameHandler = (event) => {

        handleChange(event, "username");
    };
    const changePasswordHandler = (event) => {
        handleChange(event, "password");
    };

   
  const handleLogin = (event) => {


    const username_format = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const passowrd_format = /^[a-zA-Z0-9!@#$]*$/;

    const username = state.member.username;
    const passowrd = state.member.password;

    if(!username_format.test(username)){
      alert("잘못된 아이디 형식입니다");
      return;
    }else if(!passowrd_format.test(passowrd)){
      alert("잘못된 비밀번호 형식입니다");
      return;
    }
       
      
    event.preventDefault();
    const member = {
        username : state.member.username,
        password : state.member.password
    }
    MemberService.loginMember(member).then((res)=>{

      const jwtToken = res.data;


      // const expiresInDays = 3;
      
      // js-cookie 라이브러리를 사용하여 JWT를 쿠키에 저장
   
      saveTokenToLocalStorage(jwtToken)


      setTimeout(() => goToLogin(), 100);
    });

    //console.log('다음으로 회원가입 중:', state.member);
  };

   const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('Authorization', token);
  };

    const goToLogin = () => {

    navigate('/');       
    };  




  return (
    <div>
      <h2>로그인</h2>
      <form>
        <label>
          사용자 이름:
          <input
            type="text"
            value={state.member.username}
            onChange={changeUsernameHandler}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            value={state.member.password}
            onChange={changePasswordHandler}
          />
        </label>
        <br />
        <button type="submit" onClick={handleLogin}>
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

export default LoginComponent;
