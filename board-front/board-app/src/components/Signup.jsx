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

    event.preventDefault();
    const member = {
        nickname : state.member.nickname,
        username : state.member.username,
        password : state.member.password,
        email : state.member.email,
        role : "USER"
    }
    BoardService.createMember(member).then((res)=>{
        goToBoard();
    });

    console.log('다음으로 회원가입 중:', state.member);
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
