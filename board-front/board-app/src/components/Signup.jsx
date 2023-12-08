// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../Service/BoardService';


function Signup() {
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
    let email_format = /^[a-zA-Z_\.-][a-zA-Z_\d\.-]*@[a-zA-Z_\d]+(\.[a-zA-Z_\d]+){1,2}$/;
    const email = state.member.email;

    if (!email_format.test(email)){
      alert("잘못된 이메일 형식입니다");
      return;
    }
       
      
    event.preventDefault();
    const member = {
        nickname : state.member.nickname,
        username : state.member.username,
        password : state.member.password,
        email : state.member.email,
        // 기본적으로 USER 권한이며, 생략하면 null이라서 에러남. ㅋ
        role : "USER"
    }
    BoardService.createMember(member).then((res)=>{
        goToBoard();
    });

    //console.log('다음으로 회원가입 중:', state.member);
  };

  const goToBoard = () => {

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

export default Signup;
