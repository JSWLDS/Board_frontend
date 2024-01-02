import React, { useEffect } from 'react';
import NavComponent from './NavComponent';
import { useNavigate } from 'react-router-dom'; 
import memberService from '../../Service/MemberService';
function HeaderComponent(){

    const navigate = useNavigate();

    function login() {
        
        navigate('/login');
        return;
    }
    let jwtTokenExpired = (localStorage.getItem('Authorization'));

    // memberService.isTokenExpired

    function logDiv(){
        // const logDiv = document.getElementById('logDiv');
        
        let returnTag;
        if(!jwtTokenExpired) {
            returnTag=(
                <a onClick={login} className='login'>로그인</a>
            );
        }else {
            returnTag=(
                <a onClick={logout} className='logout'>로그아웃</a>
            );
        }
        return returnTag;
    }


    function logout(){

        localStorage.removeItem('Authorization');
        alert('로그아웃 하였습니다!');
        navigate('/')

        return;
    }



        return (
            <div>
                <header>
               
                    <h1>Spring boot, React 게시판</h1>
                    <div>
                        <div>
                        
                        </div>
                        <div>
                            
                        </div>
                        <div id='logDiv'>
                            {logDiv()}
                        </div>
                        
                    </div>
                </header>
                  <NavComponent/>
            </div>
        );
}


export default HeaderComponent;