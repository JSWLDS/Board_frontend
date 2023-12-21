// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberService from '../Service/MemberService';


function SignupComponent() {
    const [state, setState] = useState({
        member:{
            nickname : "",
            username : "",
            email : "",
            password : ""
        }
    });
    const navigate = useNavigate();

    const handleChange = (event, field)=> {
    
        const {value} = event.target;

        setState((prevState)=>({...state, member:{...prevState.member,  [field] : value }}));
    };


const changeNicknameHandler = (event) => {

    handleChange(event, "nickname");

};

const changeUsernameHandler = (event) => {

    handleChange(event, "username");
};
const changePasswordHandler = (event) => {
    handleChange(event, "password");
};
const changeEmailHandler = (event) => {
    handleChange(event, "email");
};



  const handleSignup = (event) => {

    // state 방식으로 데이터를 전송하기 때문에 email 패턴을 정규 표현식을 이용하여 적용하였다.
    const email_format = /^[a-zA-Z_.-][a-zA-Z_\d.-]*@[a-zA-Z_\d]+(\.[a-zA-Z_\d]+){1,2}$/;
    const username_format = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const passowrd_format = /^[a-zA-Z0-9!@#$]*$/;

    const email = state.member.email;
    const username = state.member.username;
    const passowrd = state.member.passowrd;

    if (!email_format.test(email)){
      alert("잘못된 이메일 형식입니다");
      return;
    }else if(!username_format.test(username)){
      alert("잘못된 아이디 형식입니다");
      return;
    }else if(!passowrd_format.test(passowrd)){
      alert("잘못된 비밀번호 형식입니다");
      return;
    }
       
      
    event.preventDefault();
    const member = {
        nickname : state.member.nickname,
        username : state.member.username,
        password : state.member.password,
        email : state.member.email,
        // 기본적으로 USER 권한이며, 생략하면 null이라서 에러남. ㅋ
        roles : "USER"
    }
    MemberService.signMember(member).then((res)=>{
      goToSign();
    });

    //console.log('다음으로 회원가입 중:', state.member);
  };

  const goToSign = () => {

    navigate('/login');       
};  

  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <label>
          닉네임:
          <input
            type="text"
            value={state.member.nickname}
            onChange={changeNicknameHandler}
          />
        </label>
        <br />
        <label>
          아이디:
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
        <label>
          이메일:
          <input
            type="email"
            pattern='.+@gmail\.com'
            value={state.member.email}
            onChange={changeEmailHandler}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupComponent;
